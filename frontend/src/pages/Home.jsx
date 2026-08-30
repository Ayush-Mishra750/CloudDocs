import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cloud,
  ArrowRight,
  ShieldCheck,
  Upload,
  HardDrive,
  Share2,
  ExternalLink,
  Check,
  FileText,
  Lock,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Footer } from '../components/layout/Footer';

export const Home = () => {
  const { user } = useAuth();
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="space-y-12 py-4 max-w-6xl mx-auto font-sans text-slate-800">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Clean & Simple) */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Cloud Storage & File Sharing Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Store, Manage & Share Your Files with <span className="text-blue-600">CloudDocs</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Upload documents, images, audio, and videos with S3 speed. Open any file in a new tab to view instantly, sync Google Drive, and share securely with custom links.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to={user ? '/dashboard' : '/register'}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all"
            >
              <span>{user ? 'Open Storage Workspace' : 'Get Started Free'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
            >
              <span>See How It Works</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HOW CLOUDDOCS WORKS (Simple 3 Steps) */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="space-y-6 pt-4">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">How CloudDocs Works</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A simple 3-step process to manage and share your cloud documents effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Upload & Store Files</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload images, PDFs, code logs, or videos using fast direct S3 storage. Create folders to stay organized.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Open in New Page</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Click any document or image to open it directly into a clean, new browser page with built-in viewer controls.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Share & Collaborate</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Generate public links with expiration dates or invite collaborators with Viewer and Editor permissions.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHAT FEATURES IT GIVES (Clean Feature Grid) */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-4">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">Features & Capabilities</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need for secure document storage and seamless collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <ExternalLink className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">New Tab File Viewer</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Open images, PDFs, videos, and text files in a dedicated viewer without downloading or modal lag.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">S3 Direct Speed</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              High-speed presigned URLs allow direct cloud uploads without server slowdowns.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Google Drive Sync</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Connect Google Drive to import files directly into your CloudDocs storage with 1-click.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Granular Link Sharing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Create shareable links with custom expiration timers and view counter tracking.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Secure JWT & OTP Auth</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Protected with HTTP-only cookies, Google OAuth, and email verification OTP codes.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Auto-Trash & Storage</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Recycle deleted files with 30-day recovery and real-time storage quota tracking.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SUBSCRIPTION PLANS (Simple Normal UI) */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-4">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">Subscription Plans</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Choose the plan that fits your storage needs.
          </p>

          <div className="inline-flex items-center space-x-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                !isAnnual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isAnnual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Plan */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Free Plan</span>
              <h3 className="text-xl font-bold text-slate-900">Starter</h3>
              <div className="text-3xl font-extrabold text-slate-900">$0 <span className="text-xs text-slate-500 font-normal">/ month</span></div>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>15 GB Free Cloud Storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>New Tab File Preview</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Basic Share Links</span>
                </li>
              </ul>
            </div>
            <Link
              to={user ? '/dashboard' : '/register'}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center transition-colors"
            >
              Start Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white p-6 rounded-2xl border-2 border-blue-600 shadow-md flex flex-col justify-between space-y-4 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase">
              Popular
            </span>
            <div className="space-y-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Pro Storage</span>
              <h3 className="text-xl font-bold text-slate-900">Pro Plan</h3>
              <div className="text-3xl font-extrabold text-slate-900">
                ${isAnnual ? '7.50' : '9.00'} <span className="text-xs text-slate-500 font-normal">/ month</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>2 TB (2,000 GB) Cloud Storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Unlimited Share Links & Timers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Google Drive 1-Click Import</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Priority S3 Bandwidth</span>
                </li>
              </ul>
            </div>
            <Link
              to={user ? '/subscription' : '/register'}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center shadow-sm transition-colors"
            >
              Upgrade to Pro
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">For Teams</span>
              <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
              <div className="text-3xl font-extrabold text-slate-900">
                ${isAnnual ? '24.00' : '29.00'} <span className="text-xs text-slate-500 font-normal">/ month</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>10 TB Dedicated Cloud Storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Team Role Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Admin Panel Metrics & Audit Logs</span>
                </li>
              </ul>
            </div>
            <Link
              to={user ? '/subscription' : '/register'}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition-colors"
            >
              Select Enterprise
            </Link>
          </div>
        </div>
      </section>

      {/* Footer rendered ONLY on Home Page */}
      <Footer />
    </div>
  );
};
