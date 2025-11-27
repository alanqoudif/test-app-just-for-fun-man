import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { Alert } from 'react-native';
import { ORDER_STATUSES } from '../constants/orderStatuses';
import { generatePickupCode } from '../utils/format';
import {
  CartItem,
  LocationSelection,
  MenuItem,
  Order,
  Restaurant
} from '../types';

interface AppState {
  location?: LocationSelection;
  selectedRestaurant?: Restaurant;
  cart: CartItem[];
  activeOrder?: Order;
}

type Action =
  | { type: 'SET_LOCATION'; payload: LocationSelection }
  | { type: 'SET_RESTAURANT'; payload?: Restaurant }
  | { type: 'ADD_TO_CART'; payload: { item: MenuItem; restaurant: Restaurant; note?: string } }
  | { type: 'UPDATE_CART_ITEM_QUANTITY'; payload: { menuItemId: string; quantity: number } }
  | { type: 'UPDATE_CART_ITEM_NOTE'; payload: { menuItemId: string; note: string } }
  | { type: 'REMOVE_CART_ITEM'; payload: { menuItemId: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'PLACE_ORDER'; payload: Order }
  | { type: 'ADVANCE_ORDER_STATUS' }
  | { type: 'RESET_ORDER' };

const initialState: AppState = {
  cart: []
};

const AppContext = createContext<{
  location?: LocationSelection;
  selectedRestaurant?: Restaurant;
  cart: CartItem[];
  activeOrder?: Order;
  setLocation: (selection: LocationSelection) => void;
  setSelectedRestaurant: (restaurant?: Restaurant) => void;
  addItemToCart: (item: MenuItem, restaurant: Restaurant, note?: string) => void;
  updateCartItemQuantity: (menuItemId: string, quantity: number) => void;
  updateCartItemNote: (menuItemId: string, note: string) => void;
  removeCartItem: (menuItemId: string) => void;
  clearCart: () => void;
  placeOrder: () => Order | undefined;
  advanceOrderStatus: () => void;
  resetOrder: () => void;
} | null>(null);

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_RESTAURANT':
      return { ...state, selectedRestaurant: action.payload };
    case 'ADD_TO_CART': {
      const { item, restaurant, note } = action.payload;
      const cartFromSameRestaurant =
        state.cart.length > 0 && state.cart[0].restaurantId !== restaurant.id
          ? []
          : state.cart;

      const existingIndex = cartFromSameRestaurant.findIndex(
        (cartItem) => cartItem.menuItemId === item.id
      );

      if (existingIndex >= 0) {
        const updated = [...cartFromSameRestaurant];
        const existing = updated[existingIndex];
        updated[existingIndex] = {
          ...existing,
          quantity: existing.quantity + 1,
          note: note ?? existing.note
        };
        return { ...state, cart: updated, selectedRestaurant: restaurant };
      }

      const newItem: CartItem = {
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        note,
        restaurantId: restaurant.id
      };

      return {
        ...state,
        cart: [...cartFromSameRestaurant, newItem],
        selectedRestaurant: restaurant
      };
    }
    case 'UPDATE_CART_ITEM_QUANTITY': {
      const updatedCart = state.cart
        .map((item) =>
          item.menuItemId === action.payload.menuItemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);
      return { ...state, cart: updatedCart };
    }
    case 'UPDATE_CART_ITEM_NOTE': {
      const updatedCart = state.cart.map((item) =>
        item.menuItemId === action.payload.menuItemId
          ? { ...item, note: action.payload.note }
          : item
      );
      return { ...state, cart: updatedCart };
    }
    case 'REMOVE_CART_ITEM': {
      const updatedCart = state.cart.filter(
        (item) => item.menuItemId !== action.payload.menuItemId
      );
      return { ...state, cart: updatedCart };
    }
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'PLACE_ORDER':
      return { ...state, cart: [], activeOrder: action.payload };
    case 'ADVANCE_ORDER_STATUS': {
      if (!state.activeOrder) {
        return state;
      }
      const nextStatusIndex = Math.min(
        state.activeOrder.statusIndex + 1,
        state.activeOrder.statuses.length - 1
      );
      return {
        ...state,
        activeOrder: { ...state.activeOrder, statusIndex: nextStatusIndex }
      };
    }
    case 'RESET_ORDER':
      return { ...state, activeOrder: undefined };
    default:
      return state;
  }
};

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLocation = (selection: LocationSelection) =>
    dispatch({ type: 'SET_LOCATION', payload: selection });

  const setSelectedRestaurant = (restaurant?: Restaurant) =>
    dispatch({ type: 'SET_RESTAURANT', payload: restaurant });

  const addItemToCart = (item: MenuItem, restaurant: Restaurant, note?: string) => {
    if (!restaurant) {
      Alert.alert('اختر مطعماً أولاً');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: { item, restaurant, note } });
  };

  const updateCartItemQuantity = (menuItemId: string, quantity: number) =>
    dispatch({ type: 'UPDATE_CART_ITEM_QUANTITY', payload: { menuItemId, quantity } });

  const updateCartItemNote = (menuItemId: string, note: string) =>
    dispatch({ type: 'UPDATE_CART_ITEM_NOTE', payload: { menuItemId, note } });

  const removeCartItem = (menuItemId: string) =>
    dispatch({ type: 'REMOVE_CART_ITEM', payload: { menuItemId } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const placeOrder = (): Order | undefined => {
    if (!state.selectedRestaurant || state.cart.length === 0) {
      Alert.alert('العربة فارغة', 'أضف المنتجات قبل إكمال الطلب.');
      return undefined;
    }

    const total = state.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order: Order = {
      id: `ORD-${Date.now()}`,
      restaurant: state.selectedRestaurant,
      items: state.cart,
      total,
      statusIndex: 0,
      statuses: ORDER_STATUSES,
      pickupCode: generatePickupCode(),
      placedAt: Date.now()
    };

    dispatch({ type: 'PLACE_ORDER', payload: order });
    return order;
  };

  const advanceOrderStatus = () => dispatch({ type: 'ADVANCE_ORDER_STATUS' });
  const resetOrder = () => dispatch({ type: 'RESET_ORDER' });

  const value = useMemo(
    () => ({
      location: state.location,
      selectedRestaurant: state.selectedRestaurant,
      cart: state.cart,
      activeOrder: state.activeOrder,
      setLocation,
      setSelectedRestaurant,
      addItemToCart,
      updateCartItemQuantity,
      updateCartItemNote,
      removeCartItem,
      clearCart,
      placeOrder,
      advanceOrderStatus,
      resetOrder
    }),
    [state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
