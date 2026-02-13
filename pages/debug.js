import React, { useState, useEffect } from 'react';

export default function DebugPage() {
  const [status, setStatus] = useState({
    apiKey: false,
    newsApiCall: null,
    newsData: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    async function checkEverything() {
      try {
        console.log('🔍 Starting debug check...');
        
        // 1. Check if API key exists
        const hasKey = !!process.env.NEXT_PUBLIC_NEWS_API_KEY;
        console.log('API Key status:', hasKey);
        
        // 2. Try to fetch news
        try {
          const response = await fetch('/api/test-news');
          const data = await response.json();
          
          console.log('API Response:', data);
          
          setStatus({
            apiKey: hasKey,
            newsApiCall: {
              status: response.status,
              ok: response.ok,
              data
            },
            newsData: data.articles || [],
            error: data.error || null,
            loading: false
          });
        } catch (fetchError) {
          console.error('Fetch error:', fetchError);
          setStatus(prev => ({
            ...prev,
            error: fetchError.message,
            loading: false
          }));
        }
      } catch (err) {
        console.error('Debug error:', err);
        setStatus(prev => ({
          ...prev,
          error: err.message,
          loading: false
        }));
      }
    }

    checkEverything();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pitch to-pitch-dark p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">🔍 Debug - فحص الأخبار</h1>

        {/* API Key Status */}
        <div className={`glass-card p-6 mb-6 border-l-4 ${status.apiKey ? 'border-green-500' : 'border-red-500'}`}>
          <h2 className="text-xl font-bold text-white mb-2">🔑 API Key</h2>
          <p className={status.apiKey ? 'text-green-400' : 'text-red-400'}>
            {status.apiKey ? '✅ API Key موجود' : '❌ API Key غير موجود'}
          </p>
        </div>

        {/* Loading State */}
        {status.loading && (
          <div className="glass-card p-6 text-center text-gray-400">
            <div className="inline-block animate-spin mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <p>جاري الفحص...</p>
          </div>
        )}

        {/* Error State */}
        {status.error && !status.loading && (
          <div className="glass-card p-6 border-l-4 border-red-500 mb-6">
            <h2 className="text-xl font-bold text-red-400 mb-2">❌ خطأ</h2>
            <p className="text-gray-300 font-mono bg-pitch-dark/50 p-4 rounded">
              {status.error}
            </p>
          </div>
        )}

        {/* API Response */}
        {status.newsApiCall && !status.loading && (
          <div className="glass-card p-6 border-l-4 border-blue-500 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">📡 API Response</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Status:</span>
                <span className={`ml-2 font-bold ${status.newsApiCall.ok ? 'text-green-400' : 'text-red-400'}`}>
                  {status.newsApiCall.status}
                </span>
              </p>
              <p>
                <span className="text-gray-400">OK:</span>
                <span className={`ml-2 font-bold ${status.newsApiCall.ok ? 'text-green-400' : 'text-red-400'}`}>
                  {status.newsApiCall.ok ? 'Yes' : 'No'}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Articles Count */}
        {!status.loading && (
          <div className="glass-card p-6 border-l-4 border-yellow-500 mb-6">
            <h2 className="text-xl font-bold text-white mb-2">📰 Articles Found</h2>
            <p className={`text-2xl font-bold ${status.newsData && status.newsData.length > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {status.newsData ? status.newsData.length : 0} مقال
            </p>
          </div>
        )}

        {/* Articles List */}
        {status.newsData && status.newsData.length > 0 && (
          <div className="glass-card p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-white mb-4">✅ المقالات:</h2>
            <div className="space-y-4">
              {status.newsData.slice(0, 5).map((article, idx) => (
                <div key={idx} className="bg-pitch-dark/50 p-4 rounded border border-brand-500/20">
                  <p className="text-white font-semibold mb-2">{idx + 1}. {article.title}</p>
                  <p className="text-gray-400 text-sm mb-2">{article.description?.substring(0, 100)}...</p>
                  <p className="text-xs text-gray-500">
                    📅 {article.publishedAt} | 📰 {article.source.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Raw Data */}
        <details className="glass-card p-6 border-l-4 border-purple-500 mt-6">
          <summary className="text-white font-bold cursor-pointer">📋 Raw Data (Click to expand)</summary>
          <pre className="mt-4 bg-pitch-dark/50 p-4 rounded text-xs text-gray-300 overflow-auto max-h-96">
            {JSON.stringify(status, null, 2)}
          </pre>
        </details>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <a
            href="/#news"
            className="inline-block px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded font-bold transition"
          >
            ← العودة للأخبار
          </a>
        </div>
      </div>
    </div>
  );
}