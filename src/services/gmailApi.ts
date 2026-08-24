export interface GmailMessageHeader {
  name: string;
  value: string;
}

export interface GmailMessagePart {
  partId?: string;
  mimeType?: string;
  filename?: string;
  headers?: GmailMessageHeader[];
  body?: {
    size?: number;
    data?: string;
  };
  parts?: GmailMessagePart[];
}

export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds?: string[];
  snippet: string;
  historyId?: string;
  internalDate: string;
  payload?: {
    partId?: string;
    mimeType?: string;
    filename?: string;
    headers: GmailMessageHeader[];
    body?: {
      size?: number;
      data?: string;
    };
    parts?: GmailMessagePart[];
  };
  sizeEstimate?: number;
}

export interface ParsedEmail {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  date: string;
  from: string;
  fromName: string;
  fromEmail: string;
  to: string;
  subject: string;
  bodyText: string;
  bodyHtml?: string;
  isUnread: boolean;
  isStarred: boolean;
  isDraft: boolean;
  isTrash: boolean;
  isSent: boolean;
}

export interface GmailUserProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

// Decode base64url to UTF-8 string
function decodeBase64Url(data: string): string {
  try {
    let base64 = data.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  } catch (e) {
    console.error('Base64 decode error', e);
    return '';
  }
}

// Encode UTF-8 string to base64url
function encodeBase64Url(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Helper to extract body from recursive MIME structure
function extractBody(payload?: GmailMessage['payload']): { text: string; html?: string } {
  if (!payload) return { text: '' };

  let text = '';
  let html = '';

  if (payload.body?.data) {
    const decoded = decodeBase64Url(payload.body.data);
    if (payload.mimeType?.includes('text/html')) {
      html = decoded;
    } else {
      text = decoded;
    }
  }

  if (payload.parts && payload.parts.length > 0) {
    const traverseParts = (parts: GmailMessagePart[]) => {
      for (const part of parts) {
        if (part.body?.data) {
          const decoded = decodeBase64Url(part.body.data);
          if (part.mimeType === 'text/plain' && !text) {
            text = decoded;
          } else if (part.mimeType === 'text/html' && !html) {
            html = decoded;
          }
        }
        if (part.parts) {
          traverseParts(part.parts);
        }
      }
    };
    traverseParts(payload.parts);
  }

  return { text: text || (html ? html.replace(/<[^>]*>?/gm, '') : ''), html: html || undefined };
}

// Parse Raw Gmail Message into easy-to-use structure
export function parseGmailMessage(msg: GmailMessage): ParsedEmail {
  const headers = msg.payload?.headers || [];
  const getHeader = (name: string) => {
    const found = headers.find((h) => h.name.toLowerCase() === name.toLowerCase());
    return found ? found.value : '';
  };

  const fromRaw = getHeader('From');
  let fromName = fromRaw;
  let fromEmail = fromRaw;
  const match = fromRaw.match(/^(.*?)(?:<([^>]+)>)?$/);
  if (match) {
    fromName = (match[1] || '').trim().replace(/^["']|["']$/g, '') || (match[2] || fromRaw);
    fromEmail = match[2] || match[1] || fromRaw;
  }

  const { text, html } = extractBody(msg.payload);
  const labelIds = msg.labelIds || [];

  return {
    id: msg.id,
    threadId: msg.threadId,
    labelIds,
    snippet: msg.snippet,
    date: getHeader('Date') || (msg.internalDate ? new Date(parseInt(msg.internalDate)).toLocaleString() : ''),
    from: fromRaw,
    fromName,
    fromEmail,
    to: getHeader('To'),
    subject: getHeader('Subject') || '(No Subject)',
    bodyText: text,
    bodyHtml: html,
    isUnread: labelIds.includes('UNREAD'),
    isStarred: labelIds.includes('STARRED'),
    isDraft: labelIds.includes('DRAFT'),
    isTrash: labelIds.includes('TRASH'),
    isSent: labelIds.includes('SENT')
  };
}

/**
 * Fetch Gmail user profile
 */
export async function fetchGmailProfile(accessToken: string): Promise<GmailUserProfile> {
  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to fetch Gmail profile: ${err}`);
  }

  return response.json();
}

/**
 * Fetch list of messages
 */
export async function listGmailMessages(
  accessToken: string,
  params: {
    labelIds?: string[];
    q?: string;
    maxResults?: number;
    pageToken?: string;
  } = {}
): Promise<{ messages: { id: string; threadId: string }[]; nextPageToken?: string; resultSizeEstimate: number }> {
  const query = new URLSearchParams();
  if (params.labelIds && params.labelIds.length > 0) {
    params.labelIds.forEach((lbl) => query.append('labelIds', lbl));
  }
  if (params.q) {
    query.set('q', params.q);
  }
  query.set('maxResults', String(params.maxResults || 20));
  if (params.pageToken) {
    query.set('pageToken', params.pageToken);
  }

  const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to list messages: ${err}`);
  }

  const data = await response.json();
  return {
    messages: data.messages || [],
    nextPageToken: data.nextPageToken,
    resultSizeEstimate: data.resultSizeEstimate || 0
  };
}

/**
 * Fetch single message details
 */
export async function getGmailMessage(accessToken: string, messageId: string): Promise<ParsedEmail> {
  const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to get message ${messageId}: ${err}`);
  }

  const data: GmailMessage = await response.json();
  return parseGmailMessage(data);
}

/**
 * Send an email via Gmail API (RFC 2822)
 */
export async function sendGmailMessage(
  accessToken: string,
  emailData: {
    to: string;
    cc?: string;
    bcc?: string;
    subject: string;
    body: string;
    threadId?: string;
    replyToMessageId?: string;
  }
): Promise<{ id: string; threadId: string; labelIds: string[] }> {
  let rfcMessage = `To: ${emailData.to}\r\n`;
  if (emailData.cc) rfcMessage += `Cc: ${emailData.cc}\r\n`;
  if (emailData.bcc) rfcMessage += `Bcc: ${emailData.bcc}\r\n`;
  rfcMessage += `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(emailData.subject)))}?=\r\n`;
  if (emailData.replyToMessageId) {
    rfcMessage += `In-Reply-To: ${emailData.replyToMessageId}\r\nReferences: ${emailData.replyToMessageId}\r\n`;
  }
  rfcMessage += 'Content-Type: text/plain; charset=UTF-8\r\n';
  rfcMessage += 'MIME-Version: 1.0\r\n\r\n';
  rfcMessage += emailData.body;

  const raw = encodeBase64Url(rfcMessage);

  const payload: any = { raw };
  if (emailData.threadId) {
    payload.threadId = emailData.threadId;
  }

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to send email: ${err}`);
  }

  return response.json();
}

/**
 * Modify Message Labels (e.g. Star, Mark Read/Unread)
 */
export async function modifyGmailMessageLabels(
  accessToken: string,
  messageId: string,
  options: { addLabelIds?: string[]; removeLabelIds?: string[] }
): Promise<GmailMessage> {
  const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/modify`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      addLabelIds: options.addLabelIds || [],
      removeLabelIds: options.removeLabelIds || []
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to modify labels: ${err}`);
  }

  return response.json();
}

/**
 * Trash Message
 */
export async function trashGmailMessage(accessToken: string, messageId: string): Promise<void> {
  const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/trash`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to trash message: ${err}`);
  }
}

/**
 * Delete Message Permanently
 */
export async function deleteGmailMessagePermanently(accessToken: string, messageId: string): Promise<void> {
  const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to delete message: ${err}`);
  }
}
