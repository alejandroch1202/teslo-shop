import { create } from 'zustand'
import type { CartProduct } from '@/interfaces'
import { persist } from 'zustand/middleware'

interface CartStoreState {
  cart: CartProduct[]
  getTotalItems: () => number
  getCartSummary: () => {
    subTotal: number
    tax: number
    total: number
    itemsInCart: number
  }
  addProductToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProduct: (product: CartProduct) => void
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },

      getCartSummary: () => {
        const { cart } = get()
        const subTotal = cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
        const tax = subTotal * 0.16
        const total = subTotal + tax
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        )

        return {
          subTotal,
          tax,
          total,
          itemsInCart
        }
      },

      addProductToCart: (product) => {
        const { cart } = get()
        // check if the product exists in the selected size
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        )

        if (!productInCart) {
          set({
            cart: [...cart, product]
          })
          return
        }

        // increment the quantity
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity
            }
          }
          return item
        })

        set({ cart: updatedCartProducts })
      },

      updateProductQuantity: (product, quantity) => {
        const { cart } = get()
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity
            }
          }
          return item
        })
        set({ cart: updatedCartProducts })
      },

      removeProduct: (product: CartProduct) => {
        const updatedCartProducts = get().cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        )
        set({ cart: updatedCartProducts })
      }
    }),
    {
      name: 'shopping-cart'
    }
  )
)
