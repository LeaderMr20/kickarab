# دليل النشر على Railway - شرح مفصل

## الطريقة الأولى: عبر Terminal (الأسهل)

### الخطوة 1: تثبيت Railway CLI

```bash
npm install -g @railway/cli
```

### الخطوة 2: تسجيل الدخول

```bash
railway login
```

سيفتح متصفح - سجل دخول بحسابك على GitHub

### الخطوة 3: إنشاء مشروع جديد

```bash
railway init
```

واتبع التعليمات:
- اختر اسم المشروع: `kickarab`
- هل تريد نشر المشروع الحالي؟ اختر `yes`

### الخطوة 4: إضافة Plugin لـ Node.js

```bash
railway add
```

اختر: **Node.js**

### الخطوة 5: إضافة متغيرات البيئة

```bash
railway variables set FOOTBALL_API_KEY=<YOUR_API_KEY>
railway variables set NODE_ENV=production
```

احصل على API Key من: https://www.api-sports.io/

### الخطوة 6: نشر المشروع

```bash
railway up
```

الانتظار حتى ينتهي من النشر ✅

### الخطوة 7: الحصول على الرابط

```bash
railway logs
```

سترى الرابط الخاص بموقعك!

---

## الطريقة الثانية: عبر Vercel (أسهل من Railway)

إذا واجهت مشاكل مع Railway، جرب **Vercel**:

```bash
npm install -g vercel
vercel
```

ثم اتبع التعليمات - تماماً كـ Railway لكن أسهل!

---

## استكشاف الأخطاء:

**إذا لم ينجح النشر:**

1. تأكد من أن `package.json` موجود ✓
2. تأكد من أن `next.config.js` موجود ✓
3. جرب: `npm run build` محلياً للتأكد من عدم وجود أخطاء
4. إذا كان هناك أخطاء، اصلحها ثم:
   ```bash
   git add .
   git commit -m "Fix build errors"
   git push
   ```

---

جرب الآن! هل تريد أن أساعدك خطوة بخطوة؟
