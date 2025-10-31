'use client';

import { useState } from "react";
import { IProduct } from "@/models/Products";
import Link from "next/link";

export default function ProductList({ products }: { products: IProduct[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category || "Other"))];

  // Filter products
  let filtered = products.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    const matchesPrice =
      (minPrice === "" || p.price >= +minPrice) &&
      (maxPrice === "" || p.price <= +maxPrice);

    return matchesName && matchesCategory && matchesPrice;
  });

  // Sort products
  if (sortOrder === "asc") filtered = filtered.sort((a, b) => a.price - b.price);
  if (sortOrder === "desc") filtered = filtered.sort((a, b) => b.price - a.price);

  return (
    <div>
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded-lg shadow-sm w-full md:w-1/3 focus:ring-2 focus:ring-pink-400 outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-lg shadow-sm w-full md:w-1/4 focus:ring-2 focus:ring-pink-400 outline-none"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <div className="flex gap-2 w-full md:w-1/3">
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value ? +e.target.value : "")}
            className="border p-2 rounded-lg shadow-sm w-1/2"
          />
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value ? +e.target.value : "")}
            className="border p-2 rounded-lg shadow-sm w-1/2"
          />
        </div>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "")}
          className="border p-2 rounded-lg shadow-sm w-full md:w-1/4 focus:ring-2 focus:ring-pink-400 outline-none"
        >
          <option value="">Sort by</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Product Cards */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <Link key={product._id.toString()} href={`/products/${product.slug}`}>
              <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-transform hover:-translate-y-1">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                )}
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                <p className="text-pink-600 font-bold mt-2">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
