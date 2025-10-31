'use client';
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">
          🛍️ Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">Your cart is currently empty.</p>
            <a
              href="/"
              className="inline-block bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      ₹{item.price.toLocaleString()} × {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-pink-600 font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-600 transition"
                      title="Remove from cart"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t mt-6 pt-6 flex justify-between items-center">
              <p className="text-xl font-bold text-gray-800">
                Total: <span className="text-pink-600">₹{totalPrice.toLocaleString()}</span>
              </p>
              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Clear Cart
                </button>
                <button
                  className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
