'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  image: string;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false); // 👈 Track added state
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading)
    return (
      <main className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">Loading product...</p>
      </main>
    );

  if (!product)
    return (
      <main className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-red-500 font-semibold">Product not found ❌</p>
      </main>
    );

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setAdded(true); // 👈 show added state
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 flex justify-center">
      <div className="max-w-4xl flex justify-center items-center w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative h-80 md:h-auto">
            <Image
              src={product.image || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
                <span className="text-gray-500 text-sm">
                  Stock: {product.inventory}
                </span>
              </div>

              <p className="text-pink-600 text-3xl font-semibold mb-6">
                ₹{product.price.toLocaleString()}
              </p>
            </div>

            {/* ✅ Button or Added Message */}
            {added ? (
              <p className="w-full text-center bg-green-100 text-green-700 py-3 rounded-lg font-semibold transition-all duration-200">
                ✅ Added to Cart
              </p>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-all duration-200"
              >
                🛒 Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
