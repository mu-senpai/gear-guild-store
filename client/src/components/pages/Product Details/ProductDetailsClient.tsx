'use client'

import { motion } from 'framer-motion'
import { useGetProductByIdQuery } from '@/redux/api/product/productApi'
import { ProductDetailsSection } from './ProductDetailsSection'
import { RelatedProductsSection } from './RelatedProductsSection'
import { ProductDetailsSkeleton } from './ProductDetailsSkeleton'
import { Button } from 'antd'

interface ProductDetailsClientProps {
  productId: string
}

export function ProductDetailsClient({ productId }: ProductDetailsClientProps) {
  const { data: productData, isLoading, error } = useGetProductByIdQuery(productId)

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  if (error || !productData?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h2>
          <p className="text-slate-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Button type="primary" href="/products">
            Browse All Products
          </Button>
        </div>
      </div>
    )
  }

  const product = productData.data

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ProductDetailsSection product={product} />
        <RelatedProductsSection category={product.category} currentProductId={product._id} />
      </motion.div>
    </div>
  )
}