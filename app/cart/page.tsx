'use client';
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center mb-3 border-b pb-2">
              <span>{item.name}</span>
              <span>₹{item.price} × {item.quantity}</span>
              <button
                className="text-red-500"
                onClick={() => removeFromCart(item._id)}
              >
                ❌
              </button>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="bg-pink-600 text-white px-4 py-2 mt-4 rounded-lg"
          >
            Clear Cart
          </button>
        </div>
      )}
    </main>
  );
}
