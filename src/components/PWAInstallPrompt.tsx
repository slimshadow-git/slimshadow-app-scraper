import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex items-start gap-3">
        <Download className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 dark:text-white">Install App</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Install SlimShadow Apps for a better experience
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleInstall}
              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              Install
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="px-3 py-1.5 text-gray-600 dark:text-gray-300 text-sm hover:text-gray-900 dark:hover:text-white"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}