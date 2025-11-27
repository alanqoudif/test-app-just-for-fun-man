export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags?: string[];
};

export type MenuSection = {
  id: string;
  title: string;
  description?: string;
  items: MenuItem[];
};

export type Restaurant = {
  id: string;
  name: string;
  state: string;
  city: string;
  neighborhood: string;
  cuisine: string[];
  description: string;
  rating: number;
  ratingCount: number;
  heroImage: string;
  gallery: string[];
  pickupEstimate: string;
  openingHours: string;
  phone?: string;
  menu: MenuSection[];
};

export type LocationSelection = {
  state: string;
  city?: string;
  label: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
};

export type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  note?: string;
  restaurantId: string;
};

export type Order = {
  id: string;
  restaurant: Restaurant;
  items: CartItem[];
  total: number;
  statusIndex: number;
  statuses: string[];
  pickupCode: string;
  placedAt: number;
};
