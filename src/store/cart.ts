import { create } from 'zustand'
import type { CartProduct } from '@/interfaces'

interface CartStoreState {
  cart: CartProduct[]
  // addProductToCart
  // updateProductQuantity
  // removeProduct
}

export const useCartStore = create<CartStoreState>()((set) => ({
  cart: []
}))
