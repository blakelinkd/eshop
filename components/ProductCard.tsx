import { FC, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      const response = await axios.post('/api/cart', { productId: product.id });
      console.log(response.data); // assuming the API returns the updated cart
      // Add any additional assertions you want to make after adding to cart here
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddingToCart(false);
    }
  };
  
  return (
    <div className="bg-white shadow rounded p-6">
      <img src={`https://source.unsplash.com/featured/?${product.name}`} alt={product.name} className="w-full mb-4" />
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-gray-600">${product.price}</p>
      <button onClick={handleAddToCart} disabled={isAddingToCart} className={`mt-4 bg-green-500 text-white py-2 px-4 rounded ${isAddingToCart ? 'opacity-50 cursor-wait' : 'hover:bg-green-600'}`}>
        {isAddingToCart ? 'Adding to cart...' : 'Add to cart'}
      </button>
    </div>
  );
};

export default ProductCard;
