import { FC, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, decrementQuantity } from '../redux/cart.slice'
import { Product } from '@prisma/client';
import { RootState } from '../redux/store';

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
  [key: string]: any;
}

interface ProductCardProps {
  product: Product;
  quantity?: number;
}

const ProductCard: FC<ProductCardProps> = ({ product, quantity }) => {
  const cart = useSelector((state: RootState) => state.cart);

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(quantity || 0);

  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      console.log('trying to add product: ' + product);
  
      // Convert Product to CartItem
      const cartItem: CartItem = {
        id: 1,
        quantity: 1,
        product: product,
      };
      
  
      dispatch(addToCart(cartItem));
      // Add any additional assertions you want to make after adding to cart here
      setLocalQuantity(localQuantity + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleRemoveUnit = () => {
    console.log('yip!')
    const item = cart.find((item) => item.product.id === product.id);
    if (item) {
      if (item.quantity === 1) {
        dispatch(removeFromCart(item.product.id));
      } else {
        dispatch(decrementQuantity(item.product.id));
      }
      setLocalQuantity(localQuantity - 1);
    }
  };
  
  
  return (
    <div className="bg-white shadow rounded p-6">
      <img src={`https://source.unsplash.com/featured/?${product.name}`} alt={product.name} className="w-full mb-4" />
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-gray-600">#{localQuantity}</p>
      
      <button onClick={handleAddToCart} disabled={isAddingToCart} className={`mt-4 bg-green-500 text-white py-2 px-4 rounded ${isAddingToCart ? 'opacity-50 cursor-wait' : 'hover:bg-green-600'}`}>
        {isAddingToCart ? 'Adding to cart...' : 'Add to cart'}
      </button>

      {quantity && (
        <button onClick={handleRemoveUnit} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Remove Unit
        </button>
      )}
    </div>
  );
};

export default ProductCard;
