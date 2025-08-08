# Shahn Sales — Server

## Quick start
```bash
cd server
cp .env.example .env       # put your MongoDB URI + JWT secret
npm install
npm run dev                # API at http://localhost:4000
```

### API
- `POST /api/auth/register {name,email,password}`
- `POST /api/auth/login {email,password}`

Use `Authorization: Bearer <token>` for:
- `GET/POST /api/products`
- `GET/POST/PUT/DELETE /api/sales`
