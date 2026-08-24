import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Mail, 
  Send, 
  Inbox, 
  Star, 
  FileText, 
  Trash2, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  LogOut, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Users, 
  Plus, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  getAccessToken,
  GMAIL_SCOPES
} from '../../services/firebaseAuth';
import { 
  listGmailMessages, 
  getGmailMessage, 
  fetchGmailProfile, 
  ParsedEmail, 
  GmailUserProfile,
  modifyGmailMessageLabels 
} from '../../services/gmailApi';
import { GoogleSignInButton } from '../gmail/GoogleSignInButton';
import { GmailMessageView } from '../gmail/GmailMessageView';
import { GmailComposerModal } from '../gmail/GmailComposerModal';
import { User } from 'firebase/auth';

export const GmailPage: React.FC<{ initialComposeTo?: string }> = ({ initialComposeTo }) => {
  const { language, t } = useLanguage();
  
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [profile, setProfile] = useState<GmailUserProfile | null>(null);

  // Folder & Search state
  const [activeFolder, setActiveFolder] = useState<'INBOX' | 'SENT' | 'STARRED' | 'DRAFT' | 'TRASH'>('INBOX');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Message data
  const [messages, setMessages] = useState<ParsedEmail[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ParsedEmail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Compose modal state
  const [isComposeOpen, setIsComposeOpen] = useState(Boolean(initialComposeTo));
  const [composeTo, setComposeTo] = useState(initialComposeTo || '');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [replyThreadId, setReplyThreadId] = useState<string | undefined>();
  const [replyMessageId, setReplyMessageId] = useState<string | undefined>();

  // Initialize auth listener on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (authUser, token) => {
        setUser(authUser);
        setAccessToken(token);
        loadProfileAndMessages(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setMessages([]);
        setProfile(null);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        await loadProfileAndMessages(result.accessToken);
      }
    } catch (err: any) {
      console.error('Sign in failed', err);
      setError(err.message || 'Failed to authenticate with Google. Please ensure popups are allowed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
      setMessages([]);
      setSelectedMessage(null);
      setProfile(null);
    } catch (err) {
      console.error('Sign out error', err);
    }
  };

  const loadProfileAndMessages = async (token: string, folder = activeFolder, query = searchQuery) => {
    setIsLoadingMessages(true);
    setError(null);
    try {
      // Fetch Profile
      try {
        const userProfile = await fetchGmailProfile(token);
        setProfile(userProfile);
      } catch (pErr) {
        console.warn('Profile fetch note:', pErr);
      }

      // Fetch message list
      const labelIds = [folder];
      const listRes = await listGmailMessages(token, {
        labelIds: folder === 'STARRED' ? ['STARRED'] : [folder],
        q: query || undefined,
        maxResults: 15
      });

      if (!listRes.messages || listRes.messages.length === 0) {
        setMessages([]);
        setIsLoadingMessages(false);
        return;
      }

      // Load details for top messages in parallel
      const detailedMessages = await Promise.all(
        listRes.messages.slice(0, 15).map(async (m) => {
          try {
            return await getGmailMessage(token, m.id);
          } catch (e) {
            return null;
          }
        })
      );

      const valid = detailedMessages.filter((m): m is ParsedEmail => m !== null);
      setMessages(valid);
    } catch (err: any) {
      console.error('Load messages error', err);
      setError(err.message || 'Unable to fetch Gmail messages. Please check your connection or re-authenticate.');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSelectFolder = (folder: typeof activeFolder) => {
    setActiveFolder(folder);
    setSelectedMessage(null);
    if (accessToken) {
      loadProfileAndMessages(accessToken, folder, searchQuery);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessToken) {
      loadProfileAndMessages(accessToken, activeFolder, searchQuery);
    }
  };

  const handleOpenMessage = async (msg: ParsedEmail) => {
    setSelectedMessage(msg);
    // If message is unread, mark as read
    if (msg.isUnread && accessToken) {
      try {
        await modifyGmailMessageLabels(accessToken, msg.id, { removeLabelIds: ['UNREAD'] });
        setMessages((prev) =>
          prev.map((item) => (item.id === msg.id ? { ...item, isUnread: false } : item))
        );
      } catch (err) {
        console.error('Mark read error', err);
      }
    }
  };

  const handleInitiateReply = (msg: ParsedEmail) => {
    setComposeTo(msg.fromEmail || msg.from);
    setComposeSubject(msg.subject.startsWith('Re:') ? msg.subject : `Re: ${msg.subject}`);
    setComposeBody(`\n\n--- On ${msg.date}, ${msg.from} wrote ---\n> ${msg.bodyText.substring(0, 300)}...`);
    setReplyThreadId(msg.threadId);
    setReplyMessageId(msg.id);
    setIsComposeOpen(true);
  };

  const handleOpenNewCompose = () => {
    setComposeTo('');
    setComposeSubject('');
    setComposeBody('');
    setReplyThreadId(undefined);
    setReplyMessageId(undefined);
    setIsComposeOpen(true);
  };

  const folders: { id: typeof activeFolder; labelEn: string; labelAm: string; icon: any }[] = [
    { id: 'INBOX', labelEn: 'Inbox', labelAm: 'የገቢ መልእክት', icon: Inbox },
    { id: 'STARRED', labelEn: 'Starred', labelAm: 'ኮከብ የተደረገባቸው', icon: Star },
    { id: 'SENT', labelEn: 'Sent', labelAm: 'የተላኩ', icon: Send },
    { id: 'DRAFT', labelEn: 'Drafts', labelAm: 'ረቂቆች', icon: FileText },
    { id: 'TRASH', labelEn: 'Trash', labelAm: 'የተጣሉ', icon: Trash2 },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-500/20 text-red-300 font-black text-xs rounded-full border border-red-400/30 uppercase tracking-widest flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-red-400" />
                <span>GMAIL INTEGRATION HUB</span>
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[11px] font-bold rounded-full border border-emerald-400/30">
                Live REST API
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'am' ? 'የዳውሮ ፋውንዴሽን ጂሜይል ግንኙነት' : 'New Dawuro Foundation Gmail Center'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {language === 'am'
                ? 'በይፋዊ የጉግል ጂሜይል አካውንትዎ በቀጥታ ይግቡ፣ ከደጋፊዎች፣ ከትምህርት ቤቶች እና ከበጎ ፈቃደኞች ጋር በቀላሉ ይገናኙ።'
                : 'Connect your authorized Google Account to securely read, compose, manage, and coordinate educational and community correspondence for Dawuro Zone.'}
            </p>
          </div>

          {/* User Auth Action Pill */}
          <div className="z-10 flex-shrink-0">
            {user && accessToken ? (
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
                <div className="flex items-center gap-2.5">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-9 h-9 rounded-full border border-amber-400/50" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">
                      {user.displayName ? user.displayName[0] : 'U'}
                    </div>
                  )}
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block truncate max-w-[160px]">
                      {user.displayName || 'Google User'}
                    </span>
                    <span className="text-[10px] text-slate-300 block truncate max-w-[160px]">
                      {profile?.emailAddress || user.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                  <button
                    onClick={() => loadProfileAndMessages(accessToken)}
                    disabled={isLoadingMessages}
                    className="flex-1 py-1.5 px-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    title="Refresh Inbox"
                  >
                    <RefreshCw className={`w-3 h-3 ${isLoadingMessages ? 'animate-spin' : ''}`} />
                    <span>Sync</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="py-1.5 px-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/30 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center space-y-3">
                <span className="text-xs font-bold text-amber-300 block">
                  Connect Google Account
                </span>
                <GoogleSignInButton
                  onClick={handleSignIn}
                  isLoading={isLoggingIn}
                  text="Connect Gmail Account"
                />
              </div>
            )}
          </div>
        </div>

        {/* Not Authenticated State */}
        {!user || !accessToken ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full inline-block">
                  SECURE GOOGLE WORKSPACE API
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Seamless Communication with the Dawuro Community
                </h2>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Connect your Gmail to coordinate school supply distribution, respond to donor inquiries for the <strong>One Pack for One Child</strong> campaign, and communicate with local field volunteers in Dawuro Zone.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white block">Direct Email Dispatch</span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-normal">
                    Send updates and responses directly with pre-formatted donor and volunteer templates.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white block">User-Confirmed Actions</span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-normal">
                    Mandatory confirmation dialogs protect against accidental sends or data deletions.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <GoogleSignInButton
                  onClick={handleSignIn}
                  isLoading={isLoggingIn}
                  text="Sign in with Google to Access Gmail"
                  className="w-full sm:w-auto text-base py-3 px-6 shadow-md shadow-blue-600/10"
                />
              </div>

              {error && (
                <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 p-6 sm:p-8 rounded-3xl text-white space-y-6 shadow-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Active Foundation Scopes</span>
              </div>

              <h3 className="text-lg font-bold text-white">
                Official Gmail Capabilities Enabled
              </h3>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Read and browse incoming inquiries in real-time</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Compose and send emails with custom templates</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Star important messages, mark read/unread status</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Safe memory-only token caching adhering to strict security</span>
                </li>
              </ul>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-slate-400 leading-relaxed">
                Official Foundation inquiries can also be submitted directly to <code className="text-amber-300">newdawuromedia@gmail.com</code>.
              </div>
            </div>

          </div>
        ) : (
          /* Authenticated Inbox Portal */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* Compose CTA Button */}
              <button
                onClick={handleOpenNewCompose}
                className="w-full py-3.5 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                <span>Compose Message</span>
              </button>

              {/* Folders List */}
              <div className="bg-white dark:bg-slate-900 p-3 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
                {folders.map((f) => {
                  const Icon = f.icon;
                  const isActive = activeFolder === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => handleSelectFolder(f.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-amber-400'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-amber-400' : 'text-slate-400'}`} />
                        <span>{language === 'am' ? f.labelAm : f.labelEn}</span>
                      </div>
                      {f.id === 'INBOX' && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                          {profile?.messagesTotal ? `${profile.messagesTotal}` : 'Live'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Foundation Fast Help Card */}
              <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-5 rounded-3xl border border-emerald-800/40 shadow-md space-y-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Heart className="w-4 h-4 text-emerald-400" />
                  <span>One Pack Campaign</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Need to send a sponsorship update or receive donation receipts? Use the pre-built quick templates inside the composer.
                </p>
              </div>

            </div>

            {/* Main Area: Message List or Message Detail */}
            <div className="lg:col-span-9 space-y-4">
              
              {/* Search & Top Action Bar */}
              <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between gap-3 flex-wrap">
                
                <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[240px] relative">
                  <input
                    type="text"
                    placeholder="Search messages by sender, subject, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-600"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                </form>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => loadProfileAndMessages(accessToken)}
                    disabled={isLoadingMessages}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMessages ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                </div>

              </div>

              {/* Content Box */}
              {selectedMessage ? (
                <GmailMessageView
                  email={selectedMessage}
                  accessToken={accessToken}
                  onBack={() => setSelectedMessage(null)}
                  onReply={handleInitiateReply}
                  onStatusChange={() => loadProfileAndMessages(accessToken)}
                />
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
                  
                  {isLoadingMessages ? (
                    <div className="p-12 text-center space-y-3">
                      <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        Retrieving messages from Gmail API...
                      </p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="p-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                        <Inbox className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          No messages found in {activeFolder}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                          {searchQuery
                            ? `No emails matched query "${searchQuery}". Try searching for another keyword.`
                            : `Your ${activeFolder.toLowerCase()} folder currently has no recent emails.`}
                        </p>
                      </div>
                      <button
                        onClick={handleOpenNewCompose}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow hover:bg-blue-700 transition-colors"
                      >
                        Compose First Email
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          onClick={() => handleOpenMessage(msg)}
                          className={`p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-blue-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer ${
                            msg.isUnread ? 'bg-blue-50/20 dark:bg-slate-800/20 font-bold' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="flex-shrink-0">
                              {msg.isStarred ? (
                                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                              ) : (
                                <div className={`w-2.5 h-2.5 rounded-full ${msg.isUnread ? 'bg-blue-600' : 'bg-transparent'}`} />
                              )}
                            </div>

                            <div className="min-w-0 flex-1 space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className={`text-xs sm:text-sm truncate ${msg.isUnread ? 'text-slate-900 dark:text-white font-extrabold' : 'text-slate-700 dark:text-slate-300 font-medium'}`}>
                                  {msg.fromName || msg.from}
                                </span>
                                <span className="text-[11px] text-slate-400 flex-shrink-0">
                                  {msg.date.split(',')[0]}
                                </span>
                              </div>

                              <h4 className={`text-xs sm:text-sm truncate ${msg.isUnread ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-800 dark:text-slate-200'}`}>
                                {msg.subject}
                              </h4>

                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xl font-normal">
                                {msg.snippet}
                              </p>
                            </div>
                          </div>

                          <div className="flex-shrink-0 pl-2">
                            <ArrowRight className="w-4 h-4 text-slate-400 hover:text-blue-600" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Global Gmail Composer Modal */}
      {accessToken && (
        <GmailComposerModal
          isOpen={isComposeOpen}
          onClose={() => setIsComposeOpen(false)}
          accessToken={accessToken}
          initialTo={composeTo}
          initialSubject={composeSubject}
          initialBody={composeBody}
          threadId={replyThreadId}
          replyToMessageId={replyMessageId}
          onSuccess={(sent) => {
            loadProfileAndMessages(accessToken);
          }}
        />
      )}

    </div>
  );
};
