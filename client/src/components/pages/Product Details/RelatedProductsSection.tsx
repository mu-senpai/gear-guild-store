'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion } from 'framer-motion'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useGetProductsQuery } from '@/redux/api/product/productApi'
import { ProductCard } from '@/components/cards/ProductCard'
import { ProductCardSkeleton } from '@/components/cards/ProductCardSkeleton'
import { Product } from '@/types/api'

interface RelatedProductsSectionProps {
    category: string
    currentProductId: string
}

export function RelatedProductsSection({ category, currentProductId }: RelatedProductsSectionProps) {
    const swiperRef = useRef<SwiperType | null>(null)

    const { data: categoryProducts, isLoading, error } = useGetProductsQuery({
        category,
        limit: 10
    })

    // Filter out current product from related products
    const relatedProducts = categoryProducts?.data?.filter(
        (product: Product) => product._id !== currentProductId
    ) || []

    if (error || relatedProducts.length === 0) {
        return null
    }

    return (
        <section className="py-10 sm:py-14 lg:py-20 bg-white">
            <div className="w-11/12 2xl:w-[88%] max-w-[105.6rem] mx-auto">
                {/* Header */}
                <div className="mb-8 lg:mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl xl:text-4xl font-bold text-slate-900 mb-2 md:mb-3 xl:mb-4">
                            Related Products
                        </h2>
                        <p className="text-slate-600 text-sm md:text-base xl:text-lg">
                            More products from the {category} category
                        </p>
                    </motion.div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                )}

                {/* Swiper */}
                {relatedProducts.length > 0 && (
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper
                        }}
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            bulletClass:
                                'swiper-pagination-bullet !w-3 !h-3 !bg-slate-300 !opacity-100 transition-all duration-200 !mx-1',
                            bulletActiveClass:
                                'swiper-pagination-bullet-active !bg-blue-600 !w-8 !rounded-full',
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 32,
                            },
                        }}
                        loop={relatedProducts.length > 3}
                        className="!pb-16 !pt-2"
                    >
                        {relatedProducts.map((product: Product, index: number) => (
                            <SwiperSlide key={product._id} className="cursor-pointer">
                                <ProductCard product={product} index={index} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    )
}