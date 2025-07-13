'use client'

import { motion, Variants } from 'framer-motion'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCartOutlined, CheckOutlined } from '@ant-design/icons'
import { Button, Badge } from 'antd'
import { useAddToCartMutation } from '@/redux/api/cart/cartApi'
import { openCart } from '@/redux/services/ui/uiSlice'
import { SessionManager } from '@/utils/sessionManager'
import { formatPrice, calculateDiscountPercentage } from '@/utils/productHelpers'
import { toast } from 'sonner'

interface Product {
  _id: string
  title: string
  description: string
  price: number
  discountedPrice: number | null
  image: string
  category: 'Mobiles' | 'Laptops' | 'Accessories'
  inStock: boolean
  savings?: number
}

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [addToCart, { isLoading }] = useAddToCartMutation()
  const [isAdded, setIsAdded] = useState(false)
  const dispatch = useDispatch()

  const sessionId = SessionManager.getSessionId()
  const effectivePrice = product.discountedPrice || product.price
  const hasDiscount = product.discountedPrice !== null
  const discountPercentage = hasDiscount 
    ? calculateDiscountPercentage(product.price, product.discountedPrice!)
    : 0

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking button
    e.stopPropagation()

    if (!product.inStock) {
      toast.error('Product is out of stock')
      return
    }

    try {
      await addToCart({
        sessionId,
        productId: product._id,
        quantity: 1
      }).unwrap()

      setIsAdded(true)
      toast.success('Added to cart!')
      
      // Show cart sidebar
      setTimeout(() => {
        dispatch(openCart())
      }, 500)

      // Reset button state after 2 seconds
      setTimeout(() => {
        setIsAdded(false)
      }, 2000)

    } catch (error) {
        console.log('Add to cart error:', error)
      toast.error('Failed to add to cart')
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group"
    >
      <Link href={`/products/${product._id}`}>
        <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-200 cursor-pointer h-[30rem] flex flex-col">
          
          {/* Header Section with Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            {/* Category Badge */}
            <Badge 
              count={product.category} 
              style={{ 
                backgroundColor: '#f1f5f9',
                color: '#64748b',
                borderColor: '#e2e8f0',
                fontSize: '11px',
                fontWeight: 500
              }}
            />

            {/* Discount Badge */}
            {hasDiscount && (
              <motion.div
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                {discountPercentage}% OFF
              </motion.div>
            )}
          </div>

          {/* Product Image - Full Coverage */}
          <div className="relative h-72 overflow-hidden">
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 3}
              />
            </motion.div>

            {/* Out of Stock Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            {/* Product Title */}
            <div className="mb-4">
              <h3 className="text-slate-800 font-semibold text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                {product.title}
              </h3>
            </div>

            {/* Price Section */}
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2">
                {hasDiscount && (
                  <span className="text-slate-500 text-sm line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
                <span className="text-blue-600 font-bold text-xl">
                  {formatPrice(effectivePrice)}
                </span>
              </div>

              {/* Savings Indicator */}
              {hasDiscount && (
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-sm font-medium">
                    Save {formatPrice(product.savings || (product.price - effectivePrice))}
                  </span>
                  <span className="text-green-600 text-xs bg-green-50 px-2 py-1 rounded-full">
                    {discountPercentage}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="mt-auto">
              <Button
                type="primary"
                block
                size="large"
                icon={isAdded ? <CheckOutlined /> : <ShoppingCartOutlined />}
                onClick={handleAddToCart}
                loading={isLoading}
                disabled={!product.inStock}
                className={`h-12 font-semibold text-base transition-all duration-300 ${
                  isAdded
                    ? 'bg-green-500 border-green-500 hover:bg-green-600'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 border-0 hover:from-blue-700 hover:to-blue-800'
                } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isAdded ? 'Added to Cart!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>

          {/* Hover Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
        </div>
      </Link>
    </motion.div>
  )
}