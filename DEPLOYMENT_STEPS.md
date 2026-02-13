# 🔧 ملف إعدادات الرفع - Build Configuration

## 📝 خطوات الرفع السريعة:

### **الخطوة 1: بناء المشروع**
```bash
npm run build
```

### **الخطوة 2: الرفع بـ FileZilla**
1. افتح FileZilla
2. ادخل بيانات FTP
3. انسخ مجلدات المشروع للـ root directory

### **الخطوة 3: الاختبار**
افتح الموقع: `https://kickarab2030.kesug.com`

---

## ⚙️ إذا كنت تريد Export (HTML ثابتة):

### عدّل `next.config.js`:

أضف هذا السطر:
```javascript
output: 'export'
```

ثم شغّل:
```bash
npm run build
```

سيُنشئ مجلد `out/` - رفع محتوى هذا المجلد على الاستضافة.

---

## 📂 الملفات المهمة للرفع:

```
✅ pages/
✅ components/
✅ styles/
✅ lib/
✅ context/
✅ hooks/
✅ public/
✅ .next/ (بعد البناء)
✅ package.json
✅ next.config.js
✅ tailwind.config.js
✅ postcss.config.js

❌ node_modules/ (لا ترفع!)
❌ .git/ (لا ترفع!)
❌ .env (لا ترفع!)
```

---

## 💾 الملفات الإضافية:

### .htaccess (للمسارات الديناميكية):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

**اقرأ:** [DEPLOYMENT_INFINITYFREE.md](./DEPLOYMENT_INFINITYFREE.md) للتفاصيل الكاملة
