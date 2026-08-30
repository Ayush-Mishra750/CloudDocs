import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getFileByIdApi } from '../api/fileApi';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  File,
  Info,
  Globe,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  HardDrive,
  Eye,
  User as UserIcon,
} from 'lucide-react';

export const FileViewer = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Image controls
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Text file content state
  const [textContent, setTextContent] = useState(null);
  const [loadingText, setLoadingText] = useState(false);

  const fetchFileDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getFileByIdApi(fileId);
      if (res.success && res.file) {
        setFile(res.file);

        // If text or json or code file, attempt to fetch raw content for preview
        const mime = (res.file.mimeType || '').toLowerCase();
        const name = (res.file.name || '').toLowerCase();
        const isText =
          mime.startsWith('text/') ||
          mime.includes('json') ||
          mime.includes('javascript') ||
          mime.includes('markdown') ||
          /\.(txt|md|json|js|jsx|ts|tsx|html|css|py|c|cpp|java|sh|yml|yaml|env)$/i.test(name);

        if (isText && res.file.downloadUrl) {
          fetchTextContent(res.file.downloadUrl);
        }
      } else {
        setError('File not found or permission denied.');
      }
    } catch (err) {
      console.error('Failed to fetch file details:', err);
      setError(err.response?.data?.message || 'Failed to load file. It may be deleted or private.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTextContent = async (url) => {
    try {
      setLoadingText(true);
      const res = await fetch(url, { credentials: 'include' });
      if (res.ok) {
        const text = await res.text();
        // Limit max preview to 500KB
        setTextContent(text.slice(0, 500000));
      }
    } catch (err) {
      console.error('Failed to fetch text content:', err);
    } finally {
      setLoadingText(false);
    }
  };

  useEffect(() => {
    if (fileId) {
      fetchFileDetails();
    }
  }, [fileId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Viewer page URL copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const getFileCategory = (mimeType = '', name = '') => {
    const mime = mimeType.toLowerCase();
    const fileName = name.toLowerCase();

    if (mime.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(fileName)) return 'image';
    if (mime === 'application/pdf' || mime.includes('pdf') || /\.pdf$/i.test(fileName)) return 'pdf';
    if (mime.startsWith('video/') || /\.(mp4|webm|ogg|mov|mkv|avi)$/i.test(fileName)) return 'video';
    if (mime.startsWith('audio/') || /\.(mp3|wav|ogg|aac|m4a|flac)$/i.test(fileName)) return 'audio';
    if (
      mime.startsWith('text/') ||
      mime.includes('json') ||
      mime.includes('javascript') ||
      mime.includes('markdown') ||
      /\.(txt|md|json|js|jsx|ts|tsx|html|css|py|c|cpp|java|sh|yml|yaml)$/i.test(fileName)
    )
      return 'text';
    return 'other';
  };

  const renderFileIcon = (category) => {
    if (category === 'image') return <FileImage className="w-6 h-6 text-purple-400" />;
    if (category === 'pdf') return <FileText className="w-6 h-6 text-rose-400" />;
    if (category === 'video') return <FileVideo className="w-6 h-6 text-blue-400" />;
    if (category === 'audio') return <FileAudio className="w-6 h-6 text-amber-400" />;
    if (category === 'text') return <FileText className="w-6 h-6 text-emerald-400" />;
    return <File className="w-6 h-6 text-indigo-400" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans p-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-medium text-slate-400">Loading document preview in new page...</p>
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <Info className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white">Document View Error</h2>
          <p className="text-xs text-slate-400">{error || 'The requested file is not available.'}</p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const category = getFileCategory(file.mimeType, file.name);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
  const fileUrl = `${apiBaseUrl}/files/${file._id}/view`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Fixed Control Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 truncate">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2.5 truncate">
            <div className="p-2 rounded-xl bg-slate-800 border border-slate-700/60 shrink-0">
              {renderFileIcon(category)}
            </div>
            <div className="truncate">
              <h1 className="text-sm md:text-base font-extrabold text-white truncate max-w-xs md:max-w-md" title={file.name}>
                {file.name}
              </h1>
              <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-medium">
                <span>{file.formattedSize || '0 Bytes'}</span>
                <span>•</span>
                <span className="capitalize">{category}</span>
                {file.user?.name && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <UserIcon className="w-3 h-3 text-slate-500" />
                      <span>{file.user.name}</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls Header */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleCopyLink}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700/60 transition-colors"
            title="Share viewer link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share Link'}</span>
          </button>

          {fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/60 transition-colors flex items-center space-x-1.5"
              title="Open raw file in browser tab"
            >
              <ExternalLink className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Raw File</span>
            </a>
          )}

          {fileUrl && (
            <a
              href={fileUrl}
              download={file.name}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center space-x-1.5 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </a>
          )}
        </div>
      </header>

      {/* Main View Body */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Document Content Display Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-auto relative min-h-[calc(100vh-60px)]">
          {category === 'image' && fileUrl && (
            <div className="flex flex-col items-center justify-center space-y-4 w-full h-full">
              {/* Image Controls Bar */}
              <div className="flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-800 shadow-xl z-20">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 3))}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-400 px-1">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.5))}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-800 mx-1"></div>
                <button
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
                  title="Rotate 90°"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setZoomLevel(1);
                    setRotation(0);
                  }}
                  className="px-2 py-1 text-[11px] font-semibold text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  Reset
                </button>
              </div>

              {/* Image Display */}
              <div className="overflow-auto flex items-center justify-center p-4 max-w-full max-h-[75vh]">
                <img
                  src={fileUrl}
                  alt={file.name}
                  style={{
                    transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                    transition: 'transform 0.2s ease-out',
                  }}
                  className="max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-slate-800"
                />
              </div>
            </div>
          )}

          {category === 'pdf' && fileUrl && (
            <div className="w-full h-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
              <iframe
                src={`${fileUrl}#toolbar=1`}
                className="w-full h-full border-none"
                title={file.name}
              />
            </div>
          )}

          {category === 'video' && fileUrl && (
            <div className="w-full max-w-4xl max-h-[80vh] flex items-center justify-center rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-black">
              <video
                src={fileUrl}
                controls
                autoPlay
                className="w-full max-h-[75vh] rounded-2xl"
              />
            </div>
          )}

          {category === 'audio' && fileUrl && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full text-center space-y-6 shadow-2xl">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
                <FileAudio className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{file.name}</h3>
                <p className="text-xs text-slate-400">{file.formattedSize}</p>
              </div>
              <audio src={fileUrl} controls className="w-full rounded-xl" />
            </div>
          )}

          {category === 'text' && (
            <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Text / Code Viewer</span>
                <span className="text-xs text-slate-500 font-mono">UTF-8</span>
              </div>
              {loadingText ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-500" />
                  <span>Fetching text preview...</span>
                </div>
              ) : textContent !== null ? (
                <pre className="font-mono text-xs text-slate-200 bg-slate-950 p-4 rounded-2xl overflow-x-auto max-h-[65vh] leading-relaxed whitespace-pre-wrap select-text border border-slate-800">
                  {textContent}
                </pre>
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Click below to open or download text document.
                </div>
              )}
            </div>
          )}

          {category === 'other' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 max-w-md w-full text-center space-y-5 shadow-2xl">
              <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
                <File className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white truncate mb-1">{file.name}</h2>
                <p className="text-xs text-slate-400">{file.formattedSize} • {file.mimeType || 'Document'}</p>
              </div>

              {fileUrl ? (
                <a
                  href={fileUrl}
                  download={file.name}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Document</span>
                </a>
              ) : null}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
