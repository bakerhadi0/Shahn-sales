# Shahn Sales (MERN)

مشروع مبسّط يلبي متطلباتك:
- واجهة دخول وتسجيل (JWT)
- ربط بـ MongoDB
- عمليات CRUD للمنتجات والمبيعات
- واجهة أمامية جاهزة
- تعليمات تشغيل سريعة
- ملفات جاهزة للرفع على GitHub

## المتطلبات
- Node.js 18+
- MongoDB (محلياً أو Atlas)

## التشغيل
### 1) API
```bash
cd server
cp .env.example .env   # عدّل المتغيرات
npm install
npm run dev           # http://localhost:4000
```

### 2) الواجهة
```bash
cd client
npm install
npm run dev           # http://localhost:5173
```
> أنشئ أول حساب من صفحة Register، سيصبح Admin تلقائياً.

## الإنتاج
- ضع `VITE_API_URL` في الواجهة للإشارة إلى رابط الـ API.
- شغّل `npm run build` داخل client ثم قدّم مجلد `dist` عبر أي خادم ملفات.

## ملاحظات
- الجداول: Products, Sales.
- يمكن إضافة حقول بسهولة من خلال النماذج في الواجهة أو من الـ Models في الخادم.
