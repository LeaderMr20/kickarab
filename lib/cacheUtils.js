// Clear all caches and storage
export function clearAllCaches() {
  console.log("🧹 Starting cache clearing...");
  
  try {
    // 1. Clear localStorage
    localStorage.clear();
    console.log("✅ localStorage cleared");
  } catch (e) {
    console.error("❌ Error clearing localStorage:", e);
  }

  try {
    // 2. Clear sessionStorage
    sessionStorage.clear();
    console.log("✅ sessionStorage cleared");
  } catch (e) {
    console.error("❌ Error clearing sessionStorage:", e);
  }

  try {
    // 3. Clear service worker cache
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name).then(() => {
            console.log(`✅ Cache '${name}' deleted`);
          });
        });
      });
    }
  } catch (e) {
    console.error("❌ Error clearing service worker cache:", e);
  }

  try {
    // 4. Clear IndexedDB
    if ('indexedDB' in window) {
      const dbs = await indexedDB.databases();
      dbs.forEach(db => {
        indexedDB.deleteDatabase(db.name);
        console.log(`✅ IndexedDB '${db.name}' deleted`);
      });
    }
  } catch (e) {
    console.error("❌ Error clearing IndexedDB:", e);
  }

  // 5. Force page reload
  console.log("🔄 Reloading page...");
  window.location.href = window.location.href + '?nocache=' + Date.now();
}

// Call this in your component
export function ClearCacheButton() {
  return (
    <button
      onClick={clearAllCaches}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition"
    >
      مسح كل الكاش والبيانات 🧹
    </button>
  );
}