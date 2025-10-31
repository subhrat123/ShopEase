🛍️ E-Commerce App- ShopEase (Next.js + MongoDB)

A modern full-stack E-Commerce web application built using Next.js (App Router), MongoDB, and TypeScript, featuring user authentication, admin product management, and a responsive shopping cart — all styled with a pink modern theme 💖.

🚀 Features
🧑‍💻 User Side

Browse and view products

View detailed product pages (/products/[slug])

Add/remove items from cart (/cart)

Persisted cart using context

Responsive and elegant UI

🧑‍💼 Admin Panel

Admin dashboard (/admin)

Create, edit, and delete products

View platform statistics (/api/admin/stats)

Upload product images (/api/upload)

🔒 Authentication

Login and signup using /login and /api/auth

JWT-based authentication and authorization

Middleware-protected admin routes

🧭 Folder Structure
app/
 ├── admin/                 # Admin dashboard and product management
 ├── api/                   # API routes (Next.js App Router)
 │   ├── admin/stats/       # Admin stats API
 │   ├── auth/              # Authentication APIs
 │   ├── dashboard/         # Dashboard API
 │   ├── products/          # Product CRUD APIs
 │   ├── test/              # Test endpoints
 │   ├── upload/            # Image upload API
 │   └── users/             # User management API
 ├── cart/                  # Cart page
 ├── dashboard/             # User dashboard
 ├── login/                 # Login page
 ├── products/[slug]/       # Product details page
 ├── layout.tsx             # Root layout
 ├── page.tsx               # Homepage
components/
 ├── Navbar.tsx             # Top navigation bar
 └── ProductList.tsx        # Product listing component
context/
 ├── AuthContext.tsx        # Authentication context
 └── CartContext.tsx        # Cart management context
lib/
 ├── auth.ts                # Client-side auth helpers
 ├── authServer.ts          # Server-side auth functions
 ├── dbConnect.ts           # MongoDB connection setup
 ├── validations.ts         # Input validations
 └── withAuth.ts            # Middleware for route protection
models/
 ├── Products.ts            # Product schema
 └── Users.ts               # User schema
public/
 └── uploads/               # Uploaded images
types/
 ├── index.d.ts             # Type definitions
 └── next-auth.d.ts         # Auth type definitions

⚙️ Tech Stack
Layer	Technology
Frontend	Next.js (App Router), React, Tailwind CSS
Backend	Next.js API Routes, Node.js
Database	MongoDB (Mongoose)
Auth	JWT Authentication
Deployment	Ready for Vercel / Render
🔧 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file (use .env.example as a reference):

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXTAUTH_SECRET=your_next_auth_secret

4️⃣ Run the Development Server
npm run dev


App will run on:
👉 http://localhost:3000

🧩 Rendering Strategies Used
Page	Rendering Strategy	Reason
/ (Home)	Server Component (SSR)	Fetches product list directly from server for SEO and fast load
/products/[slug]	Client-side Rendering (CSR)	Fetches product dynamically using useEffect
/cart	Client Component	Uses React Context (cart updates on client)
/admin	CSR (Protected)	Fetches and updates data after login
/recommendations (optional)	Hybrid (Server + Client)	Server fetch for data + client interactivity
🧠 Data Flow

Frontend makes requests to API routes inside /api/...

API routes connect to MongoDB using dbConnect.ts

Data is validated in /lib/validations.ts

Responses are returned as JSON → rendered on client/server as per route type

Authenticated routes check tokens using middleware (withAuth.ts)

🧱 Database Setup

MongoDB models are defined in /models/Products.ts and /models/Users.ts

Each API route imports dbConnect() to ensure the connection

Example connection:

import mongoose from "mongoose";
const dbConnect = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};
export default dbConnect;

🧾 Challenges & Solutions
Challenge	Solution
Maintaining cart persistence	Used CartContext with local storage
Handling image uploads	Implemented /api/upload with formData support
Protecting admin routes	Created withAuth.ts middleware for token validation
Rendering performance	Used hybrid rendering (Server + Client Components)
📸 Screenshots

(Add screenshots of your Home, Product, Cart, Admin, and Login pages here)

🏁 Bonus (Optional)

Added JWT authentication for Admin Dashboard

Server Components for faster initial rendering