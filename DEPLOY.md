# نشر Shahn Sales (Vercel + Render + Atlas)

## 1) MongoDB Atlas
- أنشئ Cluster واحصل على: mongodb+srv://.../shahn_sales

## 2) Render (API)
- اربط المستودع.
- يستخدم `render.yaml` تلقائيًا لنشر مجلد `server`.
- أضف `MONGODB_URI` وعدّل `JWT_SECRET` إذا رغبت.

## 3) Vercel (Client)
- اربط المستودع بمجلد `client`.
- أضف متغير `VITE_API_URL` برابط API من Render.
- أو انسخ `.env.production.example` إلى `.env.production`.

كل Push إلى GitHub سيعيد النشر تلقائيًا.
