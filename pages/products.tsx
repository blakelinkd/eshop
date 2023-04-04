import Head from 'next/head';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div className="products-view background-blur">
      <Head>
        <title>My Next.js Products Page</title>
        <meta name="description" content="Welcome to my products page!" />
      </Head>
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8" style={{ height: "fit-content" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
