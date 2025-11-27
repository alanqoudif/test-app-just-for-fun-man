export type RootStackParamList = {
  Location: undefined;
  RestaurantList: undefined;
  RestaurantDetails: { restaurantId: string };
  Menu: { restaurantId: string };
  Cart: undefined;
  OrderStatus: { orderId?: string } | undefined;
};
