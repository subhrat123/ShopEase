🧾 README.md
# 🛍️ Next.js E-Commerce Website

A modern, full-stack **E-Commerce Website** built using **Next.js 14 (App Router)**, **TypeScript**, and **MongoDB** with fully working product management, authentication, and admin panel.

---

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + TailwindCSS  
- **Backend:** Next.js API Routes (Node.js + Express-style handlers)
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT-based (Admin login)
- **UI Components:** shadcn/ui, Lucide React Icons

---

## 📁 Project Structure



ecommerce-app/
│
├── app/
│ ├── page.tsx → Home Page (SSG)
│ ├── products/[slug]/page.tsx → Product Detail Page (ISR)
│ ├── dashboard/page.tsx → Inventory Dashboard (SSR)
│ ├── admin/page.tsx → Admin Panel (Client-side Fetching)
│ └── recommendations/page.tsx → Recommendations Page (Hybrid - Server + Client)
│
├── context/
│ └── CartContext.tsx → Global Cart State
│
├── lib/
│ └── dbConnect.ts → MongoDB connection
│
├── models/
│ └── Product.ts → Product Schema
│
├── public/
│ └── uploads/ → Uploaded images
│
├── .env.example
│
└── README.md


---

## ⚙️ Environment Variables

Create a `.env` file based on the `.env.example`:



MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000


---

## 🧠 Rendering Strategies

| Page | Route | Rendering Type | Purpose |
|------|--------|----------------|----------|
| Home | `/` | **SSG (Static Site Generation)** | Products list pre-rendered for speed |
| Product Detail | `/products/[slug]` | **ISR (Incremental Static Regeneration)** | Automatically refresh outdated product data (e.g., price/stock) |
| Dashboard | `/dashboard` | **SSR (Server-Side Rendering)** | Fetch live inventory for real-time data |
| Admin | `/admin` | **CSR (Client-Side Rendering)** | Allows live API interactions for CRUD operations |
| Recommendations | `/recommendations` | **Hybrid (Server + Client)** | Server renders product list, client handles interactions |

---

## 🛠️ Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Run MongoDB (or connect to cloud)
# 5. Start the development server
npm run dev

# 6. Visit http://localhost:3000

💾 Database Setup

MongoDB collection: products

Schema fields:

{
  name: String,
  slug: String,
  description: String,
  price: Number,
  category: String,
  inventory: Number,
  image: String
}


Use your admin panel (/admin) to add new products or upload images.

🔒 Authentication (Bonus)

Admin login required for accessing /admin

JWT tokens stored securely in headers, not cookies, to avoid CSRF

Middleware: authMiddleware + adminMiddleware

📸 Screenshots

Home Page

Product Detail

Dashboard

Admin Panel

Recommendations

✨ Features

✅ Product listing with filtering/search
✅ Product detail page with Add to Cart
✅ Admin panel for CRUD
✅ JWT authentication
✅ SSG + ISR + SSR examples
✅ Responsive UI with TailwindCSS
✅ Reusable components and organized structure