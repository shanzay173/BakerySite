# Hearth & Bloom — Artisan Bakery

A bakery website built with React + Vite + Tailwind CSS on the frontend and Node.js + Express + MongoDB on the backend.

## Project structure

```
Bakerysite/
├── frontend/          # React + Vite + Tailwind client
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── backend/           # Express API server
    ├── server.js      # Entry point
    ├── config/        # MongoDB connection
    ├── models/        # Data access (Products collection)
    ├── controllers/   # Request handlers
    ├── routes/        # Express routers
    ├── middleware/
    └── package.json
```

## Getting started

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # adjust MONGODB_URI / DB_NAME if needed
npm run dev            # runs on http://localhost:5000
```

Requires a running local MongoDB instance (`mongodb://localhost:27017` by default).

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL points to http://localhost:5000 by default
npm run dev            # runs on http://localhost:5173
```

## API

The backend exposes:

| Method | Endpoint                  | Description                    |
| ------ | ------------------------- | ------------------------------ |
| GET    | `/api/health`             | Health check                   |
| GET    | `/api/products`           | Paginated products (supports `page`, `limit`, `category`, `search` query params) |
| GET    | `/api/products/categories`| Sorted list of categories      |
| GET    | `/api/products/:id`       | Single product by Mongo `_id`  |

The frontend reads its API base URL from `VITE_API_URL` in `frontend/.env`. If it is left empty, requests fall back to relative `/api` paths proxied to `http://localhost:5000` via the Vite dev server.

CORS origins allowed by default: `http://localhost:5173` and `http://127.0.0.1:5173` (configurable through `CORS_ORIGIN` in `backend/.env`).

## Notes

- Never commit `.env` files — they are git-ignored. `.env.example` files document the required variables.
- Frontend build output goes to `frontend/dist` (`npm run build` inside `frontend/`).
