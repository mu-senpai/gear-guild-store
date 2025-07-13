'use client'

import { useRef } from 'react'
import { Row, Col, Pagination, Empty, Alert } from 'antd'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/cards/ProductCard'
import { ProductCardSkeleton } from '@/components/cards/ProductCardSkeleton'
import { Product } from '@/types/api'

interface ProductsGridProps {
    products: Product[]
    pagination: {
        current: number
        total: number
        pageSize: number
        showSizeChanger: boolean
        showQuickJumper: boolean
        showTotal: (total: number, range: [number, number]) => string
        onChange: (page: number, pageSize: number) => void
    }
    loading: boolean
    error: unknown
}

export function ProductsGrid({ products, pagination, loading, error }: ProductsGridProps) {
    // Ref for scroll target
    const productsTopRef = useRef<HTMLDivElement>(null)

    // Enhanced pagination handler with scroll-to-top
    const handlePaginationChange = (page: number, pageSize: number) => {
        // Call the original pagination handler
        pagination.onChange(page, pageSize)

        // Scroll to top of the products grid
        if (productsTopRef.current) {
            productsTopRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <Alert
                    message="Error Loading Products"
                    description="Unable to load products. Please try again later."
                    type="error"
                    showIcon
                    action={
                        <button
                            onClick={() => window.location.reload()}
                            className="text-red-600 hover:text-red-700 font-medium"
                        >
                            Retry
                        </button>
                    }
                />
            </div>
        )
    }

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <Row gutter={[24, 24]}>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <Col key={index} xs={24} sm={12} md={12} lg={12} xl={8}>
                            <ProductCardSkeleton />
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-12">
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">No Products Found</h3>
                            <p className="text-slate-600">
                                Try adjusting your search criteria or browse our featured products.
                            </p>
                        </div>
                    }
                />
            </div>
        )
    }

    return (
        <div>
            {/* Scroll Target Reference */}
            <div ref={productsTopRef} className="scroll-mt-24" />

            {/* Products Grid Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                    Products ({pagination.total})
                </h2>
                <div className="text-sm text-slate-600">
                    Page {pagination.current} of {Math.ceil(pagination.total / pagination.pageSize)}
                </div>
            </div>

            {/* Products Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <Row gutter={[24, 24]}>
                    {products.map((product, index) => (
                        <Col key={product._id} xs={24} sm={12} md={12} lg={12} xl={8}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <ProductCard product={product} index={index} />
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </motion.div>

            {/* Pagination with Scroll-to-Top */}
            {pagination.total > pagination.pageSize && (
                <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="flex justify-center">
                        <Pagination
                            current={pagination.current}
                            total={pagination.total}
                            pageSize={pagination.pageSize}
                            showTotal={pagination.showTotal}
                            onChange={handlePaginationChange}
                            className="custom-pagination"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}