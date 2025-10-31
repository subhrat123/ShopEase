// app/page.tsx
import { IProduct } from "@/models/Products";
import ProductList from "@/components/ProductList";

async function getProducts(): Promise<IProduct[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    next: { revalidate: 60 },
    cache: "no-store", 
  });
  
  if (!res.ok) {
    console.error('Failed to fetch products:', res.statusText);
    return []; // return an empty array instead of crashing
  }

  try {
    return await res.json();
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🛍️ Product Catalog
      </h1>
      <ProductList products={products} />
    </main>
  );
}
