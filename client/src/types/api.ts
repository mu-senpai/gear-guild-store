// Common API response structure
export interface BaseResponse {
  success: boolean
  message?: string
}

// Common error response
export interface ErrorResponse {
  success: false
  error: string
}

// Pagination parameters
export interface PaginationParams {
  page?: number
  limit?: number
}

// Sort parameters
export interface SortParams {
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest'
}

// Filter parameters
export interface FilterParams {
  category?: 'Mobiles' | 'Laptops' | 'Accessories'
}

// Combined query parameters
export interface QueryParams extends PaginationParams, SortParams, FilterParams {}

// cartApi.ts related types //
// Cart item structure
export interface CartItem {
  id: string
  productId: string
  title: string
  price: number
  image: string
  quantity: number
  subtotal: number
}

// Cart data structure
export interface CartData {
  sessionId: string
  items: CartItem[]
  summary: {
    totalItems: number
    totalAmount: number
  }
  createdAt: string
  updatedAt: string
}

// Cart response structure
export interface CartResponse {
  success: boolean
  data: CartData
}

// Add to cart response structure
export interface AddToCartResponse {
  success: boolean
  message: string
  data: {
    cartId: string
    totalItems: number
  }
}

// Update cart item response structure
export interface CartMutationResponse {
  success: boolean
  message: string
}

// Update cart request structure
export interface AddToCartRequest {
  sessionId: string
  productId: string
  quantity: number
}

// Update cart request structure
export interface UpdateCartRequest {
  sessionId: string
  productId: string
  quantity: number
}

// Remove from cart request structure
export interface RemoveFromCartRequest {
  sessionId: string
  productId: string
}

// productApi.ts related types //
// Product structure
export interface Product {
  _id: string
  title: string
  description: string
  price: number
  discountedPrice: number | null
  effectivePrice?: number
  hasDiscount?: boolean
  discountPercentage?: number
  image: string
  category: 'Mobiles' | 'Laptops' | 'Accessories'
  inStock: boolean
  createdAt: string
}

// Products response structure
export interface ProductsResponse {
  success: boolean
  data: Product[]
  count: number
  total: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  sortBy?: string
}

// Product response structure
export interface ProductResponse {
  success: boolean
  data: Product
}

// Create product request structure
export interface CreateProductResponse {
  success: boolean
  data: Product
  message: string
}

// Get products query parameters
export interface GetProductsParams {
  page?: number
  limit?: number
  category?: string
  sortBy?: string
}