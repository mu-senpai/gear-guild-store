# Qtech Store - Backend Documentation 
REST API for the premium-tech e-commerce platform

---

## 1  Overview
| Item                | Value                                   |
|---------------------|-----------------------------------------|
| Framework           | **Node.js 18** · Express 5             |
| Database            | **MongoDB** (Mongoose ODM)             |                     |
| Response format     | `{ success: boolean, data?: T, error?: string }` |
| Base URL            | `https://qtech-task-server.vercel.app/`        |

The service exposes RESTful endpoints for products, carts, orders and authentication.  
It is documented below.

---

## 2  Project Structure
```
server/
├─ src/
│  ├─ controllers/   # Request handlers
│  ├─ models/        # Mongoose schemas
│  ├─ routes/        # Express routers
│  └─ data/         
├─ index.js
└─ .env.example
```

---

## 3  Installation & Running

### 3.1  Prerequisites  
* Node.js ≥ 18  
* MongoDB instance (local or Atlas)

### 3.2  Setup
```
git clone https://github.com/mu-senpai/qtec-task.git
cd qtec-task/server
cp .env.example .env          # add MongoDB URI
npm install
```

### 3.3  Scripts
| Command            | Description                           |
|--------------------|---------------------------------------|
| `npm run dev`      | Start API with **nodemon** + Ts-node  |
| `npm run start`    | Production build (tsc) then `node .` |
| `npm run lint`     | ESLint & Prettier checks              |
| `npm test`         | Jest unit/integration tests           |

---

## 4  Environment Variables
| Key                   | Example value                       | Notes                         |
|-----------------------|-------------------------------------|-------------------------------|
| `MONGODB_URI`         | `mongodb+srv://user:pwd@cluster/db` | connection string             |

---

## 5  API Reference

### 5.1  Products
| Method | Path                        | Query / Params                          | Notes |
|--------|-----------------------------|-----------------------------------------|-------|
| GET    | `/products`                 | `page, limit, category, sortBy, searchTerm` | list / search |
| GET    | `/products/featured`        | —                                       | curated list |
| GET    | `/products/:id`             | —                                       | single item |


Sorting options: `price-asc`, `price-desc`, `name-asc`, `name-desc`, `newest`.

Each product object includes calculated fields:
```
{
  "effectivePrice": 1199,
  "hasDiscount": true,
  "discountPercentage": 8
}
```

### 5.2  Cart
| Method | Path                                  | Body / Notes                |
|--------|---------------------------------------|-----------------------------|
| GET    | `/cart/:sessionId`                    | retrieve cart               |
| PUT    | `/cart/:sessionId`                    | `{ productId, quantity }`   |
| DELETE | `/cart/:sessionId/:productId`         | remove one line-item        |
| DELETE | `/cart/:sessionId`                    | clear entire cart           |

---

## 6  Response Examples

### 6.1  Paginated Product List
```
{
  "success": true,
  "data": [ { "_id": "...", "title": "iPhone 15 Pro", ... } ],
  "count": 10,
  "total": 54,
  "page": 1,
  "totalPages": 6,
  "hasNextPage": true,
  "hasPrevPage": false,
  "sortBy": "price-asc"
}
```

### 6.2  Cart Summary
```
{
  "success": true,
  "data": {
    "items": [
      { "id": "line1", "productId": "...", "title": "MacBook Air", "price": 999, "quantity": 1 }
    ],
    "summary": { "totalItems": 1, "totalAmount": 999 }
  }
}
```

---

## 7  Contributing
1. Fork the repo, create a branch: `feature/your-feature`
2. Submit a pull request describing your changes