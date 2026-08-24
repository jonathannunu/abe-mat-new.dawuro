import React from 'react';
import { AlertTriangle, Send, Trash2, X } from 'lucide-react';

interface GmailConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  variant?: 'danger' | 'primary' | 'warning';
  details?: { label: string; value: string }[];
  isProcessing?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const GmailConfirmDialog: React.FC<GmailConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  confirmText,
  cancelText = 'Cancel',
  variant = 'danger',
  details,
  isProcessing = false,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />,
          iconBg: 'bg-red-100 dark:bg-red-950/60',
          btnBg: 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20'
        };
      case 'primary':
        return {
          icon: <Send className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
          iconBg: 'bg-blue-100 dark:bg-blue-950/60',
          btnBg: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
        };
      case 'warning':
      default:
        return {
          icon: <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
          iconBg: 'bg-amber-100 dark:bg-amber-950/60',
          btnBg: 'bg-amber-600 hover:bg-amber-700 text-slate-950 font-bold shadow-amber-600/20'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${styles.iconBg}`}>
              {styles.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Action requires your explicit confirmation
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>

        {details && details.length > 0 && (
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
            {details.map((item, idx) => (
              <div key={idx} className="flex justify-between gap-2">
                <span className="font-semibold text-slate-500 dark:text-slate-400">{item.label}:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[220px]" title={item.value}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-2 ${styles.btnBg} disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {isProcessing && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            <span>{confirmText}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
