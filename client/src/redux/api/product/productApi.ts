import { GetProductsParams, ProductResponse, ProductsResponse } from '@/types/api'
import { baseApi } from '../baseApi'

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsParams & { searchTerm?: string }>({
      query: ({ page = 1, limit = 10, category = '', sortBy = 'price-asc', searchTerm = '' }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sortBy: sortBy,
        })
        if (category) params.append('category', category)
        if (searchTerm) params.append('searchTerm', searchTerm)
        return `products?${params}`
      },
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ _id }) => ({ type: 'Product' as const, id: _id })),
            { type: 'Product', id: 'LIST' },
          ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getFeaturedProducts: builder.query<ProductsResponse, void>({
      query: () => 'products/featured',
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ _id }) => ({ type: 'Product' as const, id: _id })),
            { type: 'Product', id: 'FEATURED' },
          ]
          : [{ type: 'Product', id: 'FEATURED' }],
    }),

    getProductById: builder.query<ProductResponse, string>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetFeaturedProductsQuery,
  useGetProductByIdQuery,
} = productApi