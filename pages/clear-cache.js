import React from 'react';

export default function ClearCache() {
  const handleClearCache = async () => {
    console.log("🧹 Starting comprehensive cache clear...");
    
    // 1. Clear all storages
    try {
      localStorage.clear();
      sessionStorage.clear();
      console.log("✅ localStorage and sessionStorage cleared");
    } catch (e) {
      console.error("Error with storage:", e);
    }

    // 2. Clear service worker caches
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => {
            console.log(`🗑️ Deleting cache: ${cacheName}`);
            return caches.delete(cacheName);
          })
        );
        console.log("✅ All caches cleared");
      } catch (e) {
        console.error("Cache clearing error:", e);
      }
    }

    // 3. Unregister service workers
    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
          registrations.map(reg => {
            console.log("🔄 Unregistering service worker...");
            return reg.unregister();
          })
        );
        console.log("✅ Service workers unregistered");
      } catch (e) {
        console.error("Service worker error:", e);
      }
    }

    // 4. Hard refresh
    setTimeout(() => {
      window.location.reload(true); // true = bypass cache
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pitch to-pitch-dark flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">🧹 مسح الكاش</h1>
        
        <p className="text-gray-400 mb-6">
          هذا سيمسح جميع البيانات المخزنة مؤقتاً والتطبيق سيحمل بيانات جديدة كاملة من الخادم.
        </p>

        <div className="bg-pitch-dark/50 rounded p-4 mb-6 text-sm text-gray-300">
          <ul className="text-right space-y-2">
            <li>✅ مسح localStorage</li>
            <li>✅ مسح sessionStorage</li>
            <li>✅ مسح Service Worker Cache</li>
            <li>✅ إلغاء Service Workers</li>
            <li>✅ إعادة تحميل الصفحة بقوة</li>
          </ul>
        </div>

        <button
          onClick={handleClearCache}
          className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 mb-4"
        >
          مسح الكاش الآن 🗑️
        </button>

        <p className="text-xs text-gray-500">
          بعد الضغط، سيتم إعادة تحميل الصفحة تلقائياً
        </p>
      </div>
    </div>
  );
}