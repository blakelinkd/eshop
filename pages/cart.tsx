import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/cart.slice';
import dynamic from 'next/dynamic';
import { Product } from '@prisma/client';
import ProductCard from '../components/ProductCard';

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
  [key: string]: any;
}

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * Number(item.product.price),
      0
    );
  };

  return (
    <div className="cart-page-view background-blur" style={{ maxWidth: '256px' }}>
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <div className="grid grid-cols-6 gap-4 text-center font-bold mb-4">
          {cart.map((item: CartItem) => (
            <ProductCard key={item.product.id} product={item.product} quantity={item.quantity}  />
          ))}
            
          </div>
          <h2>Grand Total: $ {getTotalPrice().toFixed(2)}</h2>
        </>
      )}
    </div>
  );
  
};

const DynamicCartPage = dynamic(() => Promise.resolve(CartPage), {
  ssr: false,
});

export default DynamicCartPage;
