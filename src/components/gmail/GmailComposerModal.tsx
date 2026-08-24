import React, { useState } from 'react';
import { Send, X, Sparkles, FileText, UserCheck, Heart, Users, School } from 'lucide-react';
import { GmailConfirmDialog } from './GmailConfirmDialog';
import { sendGmailMessage } from '../../services/gmailApi';

interface GmailComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  accessToken: string;
  onSuccess: (sentMsg: any) => void;
  initialTo?: string;
  initialSubject?: string;
  initialBody?: string;
  threadId?: string;
  replyToMessageId?: string;
}

export const GmailComposerModal: React.FC<GmailComposerModalProps> = ({
  isOpen,
  onClose,
  accessToken,
  onSuccess,
  initialTo = '',
  initialSubject = '',
  initialBody = '',
  threadId,
  replyToMessageId
}) => {
  const [to, setTo] = useState(initialTo);
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [isSending, setIsSending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickTemplates = [
    {
      label: 'One Pack Campaign Support',
      icon: Heart,
      subject: 'Inquiry Regarding One Pack for One Child Campaign - Dawuro',
      body: `Dear New Dawuro Foundation Team,\n\nI am writing to inquire about supporting the "One Pack for One Child" campaign in Dawuro Zone. I would love to learn more about how to contribute exercise books, writing materials, and uniform packs for rural primary students.\n\nPlease let me know the best ways to get involved and track the educational impact.\n\nWarm regards,\n`
    },
    {
      label: 'Volunteer Coordination',
      icon: Users,
      subject: 'Volunteer Application & Field Support - Dawuro Zone',
      body: `Dear New Dawuro Foundation Volunteer Coordinator,\n\nI am passionate about community development and would like to offer my time and skills to assist in field distribution, digital media, or educational workshops in Dawuro Zone.\n\nPlease share details on upcoming field initiatives and volunteer requirements.\n\nBest regards,\n`
    },
    {
      label: 'School Coordination & Needs',
      icon: School,
      subject: 'School Supply & Infrastructure Coordination Request',
      body: `Dear New Dawuro Foundation Education Program Lead,\n\nWe would like to coordinate regarding student educational material requirements for our cluster school. Many students in our primary grades are in urgent need of exercise books and learning aids for the upcoming academic semester.\n\nThank you for your tireless service to the youth of Dawuro.\n\nSincerely,\n`
    }
  ];

  const handleApplyTemplate = (tmpl: typeof quickTemplates[0]) => {
    setSubject(tmpl.subject);
    setBody(tmpl.body);
  };

  const handleInitiateSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!to.trim()) {
      setError('Please provide at least one recipient email address.');
      return;
    }
    if (!subject.trim()) {
      setError('Please enter a subject.');
      return;
    }
    if (!body.trim()) {
      setError('Please write message content before sending.');
      return;
    }
    setError(null);
    setShowConfirm(true);
  };

  const handleExecuteSend = async () => {
    setIsSending(true);
    setError(null);
    try {
      const res = await sendGmailMessage(accessToken, {
        to,
        cc: cc.trim() || undefined,
        bcc: bcc.trim() || undefined,
        subject,
        body,
        threadId,
        replyToMessageId
      });
      setShowConfirm(false);
      onSuccess(res);
      onClose();
    } catch (err: any) {
      console.error('Send mail error', err);
      setError(err.message || 'Failed to send email. Please try again.');
      setShowConfirm(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {replyToMessageId ? 'Reply to Message' : 'Compose Message via Gmail'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Directly dispatched from your authenticated Google Account
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Templates bar */}
          {!replyToMessageId && (
            <div className="px-6 py-2.5 bg-blue-50/70 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/40 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="flex items-center gap-1 font-bold text-blue-700 dark:text-blue-300 flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick Templates:</span>
              </span>
              <div className="flex items-center gap-2 flex-nowrap">
                {quickTemplates.map((t, idx) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyTemplate(t)}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800/60 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-blue-100/60 dark:hover:bg-blue-900/50 transition-colors whitespace-nowrap cursor-pointer text-[11px]"
                    >
                      <Icon className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleInitiateSend} className="p-6 flex-1 overflow-y-auto space-y-4 text-sm">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Recipients */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-10">To:</span>
                  <input
                    type="email"
                    required
                    placeholder="recipient@example.com or newdawuromedia@gmail.com"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowCcBcc(!showCcBcc)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline px-1 py-1"
                >
                  {showCcBcc ? 'Hide CC/BCC' : 'Cc / Bcc'}
                </button>
              </div>

              {showCcBcc && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in duration-150">
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-8">Cc:</span>
                    <input
                      type="email"
                      placeholder="cc@example.com"
                      value={cc}
                      onChange={(e) => setCc(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-8">Bcc:</span>
                    <input
                      type="email"
                      placeholder="bcc@example.com"
                      value={bcc}
                      onChange={(e) => setBcc(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Subject */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-14">Subject:</span>
              <input
                type="text"
                required
                placeholder="Email Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>

            {/* Body */}
            <div>
              <textarea
                rows={10}
                required
                placeholder="Write your email body here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600 leading-relaxed font-mono"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Encodes RFC 2822 standard format via Gmail API</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 hover:shadow-lg transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>

      {/* Explicit User Confirmation Modal */}
      <GmailConfirmDialog
        isOpen={showConfirm}
        title="Send this email via Gmail?"
        description="This will send an email from your authorized Google Account on your behalf. Please confirm the details below."
        confirmText="Confirm & Send Email"
        variant="primary"
        isProcessing={isSending}
        details={[
          { label: 'Recipient (To)', value: to },
          { label: 'Subject', value: subject },
          ...(cc ? [{ label: 'Cc', value: cc }] : []),
          ...(bcc ? [{ label: 'Bcc', value: bcc }] : [])
        ]}
        onConfirm={handleExecuteSend}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};
