import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      detectedTexts: [],
      cartItems: [],
      addDetectedText: (id, texts, productNameCandidates, priceCandidates) => {
        const newDetectedText = {
          id,
          texts,
          productNameCandidates,
          priceCandidates,
        };
        set((state) => ({
          detectedTexts: [...state.detectedTexts, newDetectedText],
        }));
      },
      resetDetectedTexts: () => set({ detectedTexts: [] }),

      // 카트 관련 상태 관리
      addCartItem: (id, name, price) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === id && item.name === name
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === id && item.name === name
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              cartItems: [...state.cartItems, { id, name, price, quantity: 1 }],
            };
          }
        }),
      updateCartItemQuantity: (id, name, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id && item.name === name
              ? { ...item, quantity: Math.max(1, quantity) } // 최소 수량 1
              : item
          ),
        })),
      removeCartItem: (id, name) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => !(item.id === id && item.name === name)
          ),
        })),
      getTotalPrice: () =>
        get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ), // set 제거 후 get()으로 값 반환
    }),
    {
      name: "detected-texts",
      storage: {
        getItem: (name) => {
          const storedValue = sessionStorage.getItem(name);
          return storedValue ? JSON.parse(storedValue) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);

export default useStore;
