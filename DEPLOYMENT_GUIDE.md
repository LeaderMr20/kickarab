# 🚀 دليل نشر KickArab للإنتاج

## قبل النشر للعموم

اتبع هذا الدليل لتحويل KickArab من Development إلى Production.

---

## 1️⃣ التحضيرات الأساسية

### أ. تحسينات الأمان المطلوبة

#### تشفير كلمات المرور (bcryptjs)

**الخطوة 1:** تثبيت bcryptjs
```bash
npm install bcryptjs
```

**الخطوة 2:** تحديث AuthContext.js
```javascript
import bcrypt from 'bcryptjs';

// بدل:
const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return "hash_" + Math.abs(hash).toString(36);
};

// استخدم:
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// وللتحقق:
const isValidPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
```

#### JWT Tokens للجلسات

**الخطوة 1:** تثبيت jsonwebtoken
```bash
npm install jsonwebtoken
```

**الخطوة 2:** إنشاء ملف utils/auth.js
```javascript
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
```

### ب. إعداد متغيرات البيئة

**في ملف .env.local:**
```env
# أمان
JWT_SECRET=your_super_secret_key_here_change_this_in_production

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_actual_google_client_id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your_actual_google_secret

# قاعدة البيانات
DATABASE_URL=your_database_url
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password

# الموقع
NEXT_PUBLIC_SITE_URL=https://kickarab.com (للإنتاج)

# الوضع
NODE_ENV=production
```

---

## 2️⃣ نقل البيانات إلى قاعدة بيانات

### خيار 1: MongoDB (موصى به)

**الخطوة 1:** تثبيت mongodb
```bash
npm install mongodb mongoose
```

**الخطوة 2:** إنشاء ملف db/models/User.js
```javascript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: String,
  favoriteTeam: String,
  city: String,
  bio: String,
  authMethod: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
```

**الخطوة 3:** إنشاء ملف db/models/Discussion.js
```javascript
import mongoose from 'mongoose';

const discussionSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  author: String,
  userId: mongoose.Schema.Types.ObjectId,
  replies: [{
    author: String,
    content: String,
    likes: Number,
    timestamp: Date,
  }],
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Discussion || 
  mongoose.model('Discussion', discussionSchema);
```

### خيار 2: PostgreSQL

**الخطوة 1:** تثبيت pg
```bash
npm install pg
```

**الخطوة 2:** إنشاء اتصال
```javascript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
```

---

## 3️⃣ تفعيل Google OAuth الحقيقي

### الخطوة 1: إعداد Google Console

1. اذهب https://console.cloud.google.com
2. أنشئ مشروع جديد
3. فعّل "Google+ API"
4. أنشئ "OAuth 2.0 Client ID"
5. اختر "Web application"
6. أضف Redirect URIs:
   - http://localhost:3000/api/auth/callback/google
   - https://kickarab.com/api/auth/callback/google
7. انسخ Client ID و Secret

### الخطوة 2: استخدام NextAuth.js

**تثبيت NextAuth:**
```bash
npm install next-auth
```

**إنشاء ملف pages/api/auth/[...nextauth].js:**
```javascript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        // تحقق من بيانات المستخدم من قاعدة البيانات
        const user = await findUserByEmail(credentials.email);
        if (user && await verifyPassword(credentials.password, user.password)) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
```

---

## 4️⃣ تحسينات الأداء

### أ. Code Splitting
```javascript
// بدل استيراد جميع المكونات
import ProfileModal from '../components/ProfileModal';

// استخدم dynamic import
import dynamic from 'next/dynamic';
const ProfileModal = dynamic(() => import('../components/ProfileModal'));
```

### ب. Image Optimization
```javascript
// بدل
<img src="profile.jpg" />

// استخدم Next Image
import Image from 'next/image';
<Image src="/profile.jpg" width={100} height={100} />
```

### ج. Compression
```bash
npm install compression
```

---

## 5️⃣ الإنشاء والنشر

### أ. بناء للإنتاج
```bash
npm run build
```

### ب. اختبار البناء محلياً
```bash
npm run build
npm start
```

### ج. نشر على Vercel (موصى به)

**الخطوة 1:** إنشاء حساب Vercel
- اذهب https://vercel.com
- استيراد مستودعك

**الخطوة 2:** إضافة متغيرات البيئة
- اذهب إعدادات Project
- أضف متغيرات البيئة

**الخطوة 3:** النشر
```bash
git push
# Vercel سينشر تلقائياً
```

### د. نشر على مضيف آخر

**في خادم Linux:**
```bash
# تثبيت Node.js
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# استنساخ المشروع
git clone <your-repo>
cd KickArab_project

# تثبيت المكتبات
npm install

# بناء
npm run build

# تشغيل
npm start
```

---

## 6️⃣ إعدادات الخادم

### أ. Nginx Configuration
```nginx
server {
    listen 80;
    server_name kickarab.com www.kickarab.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### ب. SSL Certificate (Let's Encrypt)
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d kickarab.com
```

### ج. Process Manager (PM2)
```bash
npm install -g pm2

# بدء التطبيق
pm2 start npm --name "kickarab" -- start

# حفظ الإعدادات
pm2 save

# تشغيل عند الإقلاع
pm2 startup
```

---

## 7️⃣ المراقبة والصيانة

### أ. Logging

**إنشاء ملف logger:**
```javascript
import fs from 'fs';

export function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  console.log(logMessage);
  
  fs.appendFileSync('logs/app.log', logMessage + '\n');
}
```

### ب. Monitoring

استخدم أداة مراقبة:
- Sentry للأخطاء
- DataDog للأداء
- Uptimerobot للفحص

---

## 8️⃣ الخطوات النهائية

### قبل الإطلاق:

- [ ] تحديث package.json بالإصدار
- [ ] اختبار شامل على الإنتاج
- [ ] تحسين SEO
- [ ] إنشاء ملف robots.txt
- [ ] إعداد analytics
- [ ] إنشاء ملف privacy policy
- [ ] إعداد monitoring

### أثناء الإطلاق:

- [ ] تسجيل النطاق
- [ ] إعداد DNS
- [ ] شهادة SSL
- [ ] نسخ احتياطية تلقائية
- [ ] خطة الطوارئ

### بعد الإطلاق:

- [ ] مراقبة الأداء
- [ ] تجميع الملاحظات
- [ ] التحديثات الأمنية
- [ ] تحسينات مستمرة

---

## 📊 Checklist الإنتاج النهائي

```
الأمان:
[ ] bcryptjs للكلمات المرور
[ ] JWT للجلسات
[ ] HTTPS/SSL
[ ] حماية CORS
[ ] Rate Limiting

الأداء:
[ ] Code Splitting
[ ] Image Optimization
[ ] Caching
[ ] CDN
[ ] Compression

البيانات:
[ ] قاعدة بيانات حقيقية
[ ] نسخ احتياطية
[ ] Migration Scripts
[ ] Monitoring

المراقبة:
[ ] Error Tracking (Sentry)
[ ] Performance Monitoring
[ ] Uptime Monitoring
[ ] Analytics

التوثيق:
[ ] API Documentation
[ ] Deployment Guide
[ ] Troubleshooting
[ ] Contact Info
```

---

## 🆘 استكشاف الأخطاء

### المشكلة: بطء الموقع
**الحل:**
1. فعّل caching
2. استخدم CDN
3. اختبر قاعدة البيانات

### المشكلة: أخطاء متكررة
**الحل:**
1. تحقق من logs
2. استخدم Sentry
3. أعد الكود

### المشكلة: مشاكل أمان
**الحل:**
1. فعّل WAF
2. حدّث المكتبات
3. قم بـ Penetration Testing

---

<div align="center">

## ✅ أنت جاهز للإنتاج!

**متى تكون جاهزاً:**
- جميع الاختبارات تمر
- الأداء جيد
- الأمان محسّن
- النسخ الاحتياطية جاهزة

**تم الإطلاق بنجاح! 🚀**

</div>
