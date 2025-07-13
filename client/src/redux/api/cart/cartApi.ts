import { AddToCartRequest, AddToCartResponse, CartMutationResponse, CartResponse, RemoveFromCartRequest, UpdateCartRequest } from '@/types/api'
import { baseApi } from '../baseApi'

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, string>({
      query: (sessionId) => `cart/${sessionId}`,
      providesTags: (result, error, sessionId) => [
        { type: 'Cart', id: sessionId },
        { type: 'Cart', id: 'LIST' },
      ],
    }),

    addToCart: builder.mutation<AddToCartResponse, AddToCartRequest>({
      query: ({ sessionId, productId, quantity }) => ({
        url: 'cart/add',
        method: 'POST',
        body: { sessionId, productId, quantity },
      }),
      invalidatesTags: (result, error, { sessionId }) => [
        { type: 'Cart', id: sessionId },
        { type: 'Cart', id: 'LIST' },
      ],
    }),

    updateCartItem: builder.mutation<CartMutationResponse, UpdateCartRequest>({
      query: ({ sessionId, productId, quantity }) => ({
        url: 'cart/update',
        method: 'PUT',
        body: { sessionId, productId, quantity },
      }),
      invalidatesTags: (result, error, { sessionId }) => [
        { type: 'Cart', id: sessionId },
        { type: 'Cart', id: 'LIST' },
      ],
    }),

    removeFromCart: builder.mutation<CartMutationResponse, RemoveFromCartRequest>({
      query: ({ sessionId, productId }) => ({
        url: `cart/${sessionId}/item/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { sessionId }) => [
        { type: 'Cart', id: sessionId },
        { type: 'Cart', id: 'LIST' },
      ],
    }),

    clearCart: builder.mutation<CartMutationResponse, string>({
      query: (sessionId) => ({
        url: `cart/${sessionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, sessionId) => [
        { type: 'Cart', id: sessionId },
        { type: 'Cart', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetCartQuery,
  useLazyGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi