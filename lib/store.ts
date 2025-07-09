import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    images: { url: string }[];
    description: string;
    slug: string;
    brand: { name: string };
    category: { name: string };
  };
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: {
    id: string;
    name: string;
    price: number;
    images: { url: string }[];
    description: string;
    slug: string;
    brand: { name: string };
    category: { name: string };
  }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore & { hydrated: boolean }>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.product.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          });
        } else {
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((total, item) => total + item.product.price * item.quantity, 0)
    }),
    {
      name: "cart-store",
      onRehydrateStorage: () => (state) => {
        state && (state.hydrated = true)
      }
    }
  )
);

interface FilterStore {
  category: string;
  brand: string;
  gender: string;
  priceRange: [number, number];
  sortBy: string;
  searchQuery: string;
  setCategory: (category: string) => void;
  setBrand: (brand: string) => void;
  setGender: (gender: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sortBy: string) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  category: "",
  brand: "",
  gender: "",
  priceRange: [0, 10000],
  sortBy: "name",
  searchQuery: "",
  setCategory: (category) => set({ category }),
  setBrand: (brand) => set({ brand }),
  setGender: (gender) => set({ gender }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  clearFilters: () =>
    set({
      category: "",
      brand: "",
      gender: "",
      priceRange: [0, 10000],
      sortBy: "name",
      searchQuery: ""
    })
}));
