'use client';

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const { user, logout, token } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
console.log( 'user in navbar:', user);
  return (
    <nav className="bg-pink-600 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          ShopEase
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="hover:text-pink-200">Products</Link>
          <Link href="/cart" className="hover:text-pink-200">Cart</Link>

          {user?.isAdmin && (
            <Link href="/admin" className="hover:text-pink-200">Admin</Link>
          )}

         

          {token ? (
            <>
              <span className="flex items-center gap-2 bg-pink-700 px-3 py-1 rounded-full text-sm">
                <User size={16} />
                {user?.name || "User"}
              </span>
              <button
                onClick={logout}
                className="ml-3 bg-white text-pink-600 px-3 py-1 rounded-lg hover:bg-pink-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-white text-pink-600 px-3 py-1 rounded-lg hover:bg-pink-100 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-pink-700 mt-3 rounded-lg p-4 space-y-3">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block hover:text-pink-200">Home</Link>
          <Link href="/products" onClick={() => setMenuOpen(false)} className="block hover:text-pink-200">Products</Link>
          {user?.isAdmin && (
            <Link href="/admin" onClick={() => setMenuOpen(false)} className="block hover:text-pink-200">Admin</Link>
          )}
          <Link href="/cart" onClick={() => setMenuOpen(false)} className="block hover:text-pink-200">Cart</Link>

          {token ? (
            <>
              <div className="flex items-center gap-2 bg-pink-800 px-3 py-2 rounded-lg text-sm">
                <User size={16} />
                {user?.name || "User"}
              </div>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full bg-white text-pink-600 px-3 py-2 rounded-lg hover:bg-pink-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block bg-white text-pink-600 px-3 py-2 rounded-lg hover:bg-pink-100 transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
