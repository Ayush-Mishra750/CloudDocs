import { Link } from 'react-router-dom';
import { Cloud, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto pt-10 pb-8 text-slate-600 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand & Mission Column */}
          <div className="col-span-2 space-y-3">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                <Cloud className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">CloudDocs</span>
            </Link>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              CloudDocs is a modern cloud storage platform for storing, viewing, and sharing documents, images, and media with presigned S3 speed and end-to-end security.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-600 font-semibold pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Navigation / Product Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to={user ? "/dashboard" : "/login"} className="hover:text-blue-600 transition-colors">
                  My Storage
                </Link>
              </li>
              <li>
                <Link to={user ? "/share" : "/login"} className="hover:text-blue-600 transition-colors">
                  Shared Files
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="hover:text-blue-600 transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link to="/status" className="hover:text-blue-600 transition-colors">
                  System Health Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Features & Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Capabilities</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  New Tab Document Viewer
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  Google Drive 1-Click Sync
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  AWS S3 Presigned Uploads
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  Share Link Expiration Timers
                </span>
              </li>
            </ul>
          </div>

          {/* Security & Support Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Security & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>AES 256-Bit Encrypted</span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer">Terms of Service</span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer">Help Center</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CloudDocs Storage Inc. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-600 transition-colors cursor-pointer">Privacy</span>
            <span>•</span>
            <span className="hover:text-slate-600 transition-colors cursor-pointer">Terms</span>
            <span>•</span>
            <span className="hover:text-slate-600 transition-colors cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
