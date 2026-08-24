import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Trash2, 
  Mail, 
  MailOpen, 
  Reply, 
  Share2, 
  Calendar, 
  User, 
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { ParsedEmail, modifyGmailMessageLabels, trashGmailMessage } from '../../services/gmailApi';
import { GmailConfirmDialog } from './GmailConfirmDialog';

interface GmailMessageViewProps {
  email: ParsedEmail;
  accessToken: string;
  onBack: () => void;
  onReply: (email: ParsedEmail) => void;
  onStatusChange: () => void;
}

export const GmailMessageView: React.FC<GmailMessageViewProps> = ({
  email,
  accessToken,
  onBack,
  onReply,
  onStatusChange
}) => {
  const [isStarred, setIsStarred] = useState(email.isStarred);
  const [isUnread, setIsUnread] = useState(email.isUnread);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showTrashConfirm, setShowTrashConfirm] = useState(false);
  const [isTrashing, setIsTrashing] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'html'>('text');

  const handleToggleStar = async () => {
    setIsUpdating(true);
    try {
      if (isStarred) {
        await modifyGmailMessageLabels(accessToken, email.id, { removeLabelIds: ['STARRED'] });
        setIsStarred(false);
      } else {
        await modifyGmailMessageLabels(accessToken, email.id, { addLabelIds: ['STARRED'] });
        setIsStarred(true);
      }
      onStatusChange();
    } catch (err) {
      console.error('Star toggle failed', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleRead = async () => {
    setIsUpdating(true);
    try {
      if (isUnread) {
        await modifyGmailMessageLabels(accessToken, email.id, { removeLabelIds: ['UNREAD'] });
        setIsUnread(false);
      } else {
        await modifyGmailMessageLabels(accessToken, email.id, { addLabelIds: ['UNREAD'] });
        setIsUnread(true);
      }
      onStatusChange();
    } catch (err) {
      console.error('Read toggle failed', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleExecuteTrash = async () => {
    setIsTrashing(true);
    try {
      await trashGmailMessage(accessToken, email.id);
      setShowTrashConfirm(false);
      onStatusChange();
      onBack();
    } catch (err) {
      console.error('Trash message failed', err);
    } finally {
      setIsTrashing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg overflow-hidden flex flex-col">
      
      {/* Top Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap bg-slate-50/70 dark:bg-slate-800/40">
        
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Inbox</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleStar}
            disabled={isUpdating}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isStarred
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-500'
                : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isStarred ? 'Unstar Message' : 'Star Message'}
          >
            <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400 text-amber-500' : ''}`} />
          </button>

          <button
            onClick={handleToggleRead}
            disabled={isUpdating}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isUnread ? 'Mark as Read' : 'Mark as Unread'}
          >
            {isUnread ? <MailOpen className="w-4 h-4 text-blue-600" /> : <Mail className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onReply(email)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer"
          >
            <Reply className="w-3.5 h-3.5" />
            <span>Reply</span>
          </button>

          <button
            onClick={() => setShowTrashConfirm(true)}
            className="p-2 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/60 transition-colors cursor-pointer"
            title="Move to Trash"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Header Info */}
      <div className="p-6 sm:p-8 space-y-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {email.subject}
          </h2>
          
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-400 flex-shrink-0">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{email.date}</span>
          </div>
        </div>

        {/* Sender details */}
        <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md uppercase">
              {email.fromName ? email.fromName[0] : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {email.fromName}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  &lt;{email.fromEmail}&gt;
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                To: <span className="font-medium text-slate-700 dark:text-slate-300">{email.to || 'me'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            {email.labelIds.map((lbl) => (
              <span
                key={lbl}
                className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 uppercase tracking-wider"
              >
                {lbl}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Message Body Content */}
      <div className="p-6 sm:p-8 flex-1">
        {email.bodyHtml && (
          <div className="flex items-center justify-end gap-2 mb-4">
            <button
              onClick={() => setActiveTab('text')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Plain Text
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'html'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Formatted (HTML)
            </button>
          </div>
        )}

        {activeTab === 'html' && email.bodyHtml ? (
          <div 
            className="prose dark:prose-invert max-w-none text-sm text-slate-800 dark:text-slate-200 leading-relaxed overflow-x-auto p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800"
            dangerouslySetInnerHTML={{ __html: email.bodyHtml }}
          />
        ) : (
          <div className="whitespace-pre-wrap font-sans text-sm text-slate-800 dark:text-slate-200 leading-relaxed p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
            {email.bodyText || email.snippet || '(No message body content)'}
          </div>
        )}

        {/* Quick bottom action reply */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Message ID: <code className="text-[11px]">{email.id}</code>
          </span>
          <button
            onClick={() => onReply(email)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Reply className="w-4 h-4" />
            <span>Reply to {email.fromName}</span>
          </button>
        </div>

      </div>

      {/* Mandatory User Confirmation Modal for Destructive Delete/Trash */}
      <GmailConfirmDialog
        isOpen={showTrashConfirm}
        title="Move message to Trash?"
        description="Are you sure you want to move this email to the Gmail Trash? You can recover it from the Trash folder within 30 days."
        confirmText="Yes, Move to Trash"
        variant="danger"
        isProcessing={isTrashing}
        details={[
          { label: 'Subject', value: email.subject },
          { label: 'From', value: email.from }
        ]}
        onConfirm={handleExecuteTrash}
        onCancel={() => setShowTrashConfirm(false)}
      />

    </div>
  );
};
