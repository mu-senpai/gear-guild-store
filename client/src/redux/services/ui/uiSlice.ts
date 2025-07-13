import { createSlice } from '@reduxjs/toolkit'

interface UIState {
  isCartOpen: boolean
  isCheckoutModalOpen: boolean
  isSuccessModalOpen: boolean
  isMobileMenuOpen: boolean
}

const initialState: UIState = {
  isCartOpen: false,
  isCheckoutModalOpen: false,
  isSuccessModalOpen: false,
  isMobileMenuOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen
    },
    openCart: (state) => {
      state.isCartOpen = true
      state.isCheckoutModalOpen = false
      state.isMobileMenuOpen = false
    },
    closeCart: (state) => {
      state.isCartOpen = false
    },
    openCheckoutModal: (state) => {
      state.isCheckoutModalOpen = true
      state.isCartOpen = false
    },
    closeCheckoutModal: (state) => {
      state.isCheckoutModalOpen = false
    },
    openSuccessModal: (state) => {
      state.isSuccessModalOpen = true
      state.isCheckoutModalOpen = false
      state.isCartOpen = false
    },
    closeSuccessModal: (state) => {
      state.isSuccessModalOpen = false
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
      if (state.isMobileMenuOpen) {
        state.isCartOpen = false
        state.isCheckoutModalOpen = false
      }
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false
    },
  },
})

export const {
  toggleCart,
  openCart,
  closeCart,
  openCheckoutModal,
  closeCheckoutModal,
  openSuccessModal,
  closeSuccessModal,
  toggleMobileMenu,
  closeMobileMenu,
} = uiSlice.actions

export default uiSlice.reducer