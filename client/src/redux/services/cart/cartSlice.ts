import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: string
  productId: string
  title: string
  price: number
  image: string
  quantity: number
  subtotal: number
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalAmount: number
  sessionId: string | null
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  sessionId: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload
      state.totalItems = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      state.totalAmount = action.payload.reduce((sum, item) => sum + item.subtotal, 0)
    },
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalAmount = 0
    },
  },
})

export const { setSessionId, setCartItems, clearCart } = cartSlice.actions
export default cartSlice.reducer