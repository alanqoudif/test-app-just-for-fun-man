import { useMemo } from 'react';
import { useApp } from '../context/AppProvider';

export const useCartTotals = () => {
  const { cart } = useApp();

  return useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Number((subtotal * 0.15).toFixed(2));
    const total = subtotal + tax;
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal,
      tax,
      total,
      itemCount
    };
  }, [cart]);
};
