import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      detectedTexts: [],
      cartItems: [],

      // 예산 //
      budget: 0,
      isModalOpen: true,
      closeModal: () => set({ isModalOpen: false }),
      setBudget: (newBudget) => set({ budget: newBudget }),
      // 예산 //

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
            (item) => item.name === name && item.price === price
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.name === name && item.price === price
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              cartItems: [
                ...state.cartItems,
                {
                  id,
                  name,
                  price,
                  quantity: 1,
                  discount: 0,
                  discountPrice: price,
                },
              ],
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

      updateCartItemDiscount: (id, discountValue) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? {
                  ...item,
                  discountPrice: Math.round(
                    (parseInt(item.price.replace(/,/g, "")) *
                      (100 - discountValue)) /
                      100
                  ),
                }
              : item
          ),
        })),

      modifyProductName: (id, newProductName) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? {
                  ...item,
                  name: newProductName,
                }
              : item
          ),
        }));
      },

      // updateCartItemDiscountPrice: (id) =>
      //   set((state) => ({
      //     cartItems: state.cartItems.map((item) => {
      //       if (item.id === id) {
      //         const originalPrice =
      //           typeof item.price === "string"
      //             ? parseInt(item.price.replace(/,/g, ""), 10)
      //             : item.price;

      //         const discount = item.discount || 0;
      //         const discountPrice = Math.round(
      //           (originalPrice * (100 - discount)) / 100
      //         );

      //         return { ...item, discountPrice };
      //       }
      //       return item;
      //     }),
      //   })),

      //   getTotalPrice: () =>
      //     get().cartItems.reduce((total, item) => {
      //       const originalPrice =
      //         typeof item.price === "string"
      //           ? parseInt(item.price.replace(/,/g, ""), 10)
      //           : item.price;

      //       const discount = item.discount || 0;
      //       const finalPrice = Math.round(
      //         (originalPrice * (100 - discount)) / 100
      //       );

      //       return total + finalPrice * item.quantity;
      //     }, 0),

      getTotalPrice: () =>
        get().cartItems.reduce((item) => {
          // 이미 discountPrice가 존재하면 그것을 사용
          const finalPrice = item.discountPrice || 0; // discountPrice가 없다면 0으로 처리

          return finalPrice * item.quantity;
        }, 0),
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
