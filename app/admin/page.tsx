'use client';

import { useState, useEffect } from 'react';
import { IProduct } from '@/models/Products';

export default function AdminPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    category: '',
    inventory: '',
    image: '',
  });
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Load token from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);
  }, []);

  // ✅ Fetch existing products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setProducts(data);
        else console.error('Fetch failed:', data.error);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    if (token) fetchProducts();
  }, [token]);

  // ✅ Handle image upload (stored locally on server)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setLoading(true);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.imageUrl) {
        setForm({ ...form, image: data.imageUrl });
        alert('✅ Image uploaded successfully!');
      } else {
        alert(`❌ Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setLoading(false);
      alert('❌ Upload failed');
    }
  };

  // ✅ Handle form submission (add product)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          inventory: Number(form.inventory),
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert('✅ Product added successfully!');
        setProducts([...products, data.product]);
        setForm({
          name: '',
          slug: '',
          description: '',
          price: '',
          category: '',
          inventory: '',
          image: '',
        });
      } else {
        alert(`❌ Error: ${data.error || 'Failed to add product'}`);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setLoading(false);
      alert('❌ Failed to add product');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🛠️ Admin Dashboard</h1>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto space-y-4"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="text"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 w-1/2 rounded"
          />
          <input
            type="number"
            placeholder="Inventory"
            value={form.inventory}
            onChange={(e) => setForm({ ...form, inventory: e.target.value })}
            className="border p-2 w-1/2 rounded"
          />
        </div>

        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <div>
          <label className="block mb-2 font-semibold">Product Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="w-full border p-2 rounded"
          />
          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="mt-3 w-40 h-40 object-cover rounded-lg"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Add Product'}
        </button>
      </form>

      {/* Product List */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Existing Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div
              key={p._id.toString()}
              className="bg-white shadow rounded-xl p-4"
            >
              <img
                src={p.image || '/placeholder.png'}
                alt={p.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-gray-600">{p.category}</p>
              <p className="text-pink-600 font-bold mt-2">₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
