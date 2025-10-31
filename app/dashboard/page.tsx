import {dbConnect} from "@/lib/dbConnect";
import Product from "@/models/Products";

export const dynamic = "force-dynamic"; // ensures SSR on each request

export default async function DashboardPage() {
  await dbConnect();
  const products = await Product.find().lean();

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.inventory, 0);
  const lowStock = products.filter((p) => p.inventory < 5);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📦 Inventory Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Products</h2>
          <p className="text-2xl font-bold text-pink-600">{totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Stock</h2>
          <p className="text-2xl font-bold text-pink-600">{totalStock}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Low Stock Items</h2>
          <p className="text-2xl font-bold text-pink-600">{lowStock.length}</p>
        </div>
      </div>

      <table className="min-w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Inventory</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p: any) => (
            <tr key={p._id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{p.name}</td>
              <td className="py-2 px-4">{p.category}</td>
              <td className="py-2 px-4">₹{p.price.toLocaleString()}</td>
              <td
                className={`py-2 px-4 font-semibold ${
                  p.inventory < 5 ? "text-red-600" : "text-green-600"
                }`}
              >
                {p.inventory}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
