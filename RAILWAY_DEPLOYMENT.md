# دليل نشر KickArab على Railway

## خطوات الإعداد:

### 1. إنشاء حساب GitHub (إذا لم يكن لديك)
- اذهب: https://github.com
- اضغط Sign Up
- أكمل البيانات

### 2. إنشاء مستودع GitHub

```bash
# في مجلد المشروع
git init
git add .
git commit -m "Initial commit - KickArab project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kickarab.git
git push -u origin main
```

**ملاحظة:** استبدل `YOUR_USERNAME` باسم مستخدم GitHub الخاص بك

### 3. نشر على Railway

1. اذهب: https://railway.app
2. اضغط "Login with GitHub"
3. وافق على الأذونات
4. اضغط "Create New Project"
5. اختر "Deploy from GitHub repo"
6. اختر مستودع KickArab
7. اضغط Deploy

### 4. إعدادات البيئة

في لوحة تحكم Railway:
1. اذهب إلى "Variables"
2. أضف المتغيرات التالية:

```
FOOTBALL_API_KEY=YOUR_API_KEY
FOOTBALL_API_BASE=https://v3.football.api-sports.io
NODE_ENV=production
```

احصل على API key من: https://www.api-sports.io/

### 5. النشر التلقائي

Railway سينشر تلقائياً عند كل push إلى GitHub!

```bash
# لنشر آخر:
git add .
git commit -m "Update features"
git push
# Railway سينشر تلقائياً ✅
```

## خطوات سريعة:

1. ✅ إنشاء GitHub repo
2. ✅ ربط Railway بحسابك
3. ✅ Deploy من GitHub
4. ✅ أضف API keys
5. ✅ الموقع يعمل! 🎉

## الرابط:

بعد النشر ستحصل على رابط مثل:
`https://kickarab-production.up.railway.app`

---

**هل تريد مساعدة في أي خطوة؟**
