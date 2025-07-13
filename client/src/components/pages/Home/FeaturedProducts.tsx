'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useGetFeaturedProductsQuery } from '@/redux/api/product/productApi'
import { ProductCard } from '@/components/cards/ProductCard'
import { ProductCardSkeleton } from '@/components/cards/ProductCardSkeleton'

const FeaturedProducts: React.FC = () => {
    const swiperRef = useRef<SwiperType | null>(null)
    const { data: featuredProducts, isLoading, error } = useGetFeaturedProductsQuery()

    const products = featuredProducts?.data || []

    if (error) {
        return (
            <section className="py-10 sm:py-14 lg:py-20 xl:py-24 2xl:py-28">
                <div className="w-11/12 2xl:w-[88%] max-w-[105.6rem] mx-auto">
                    <div className="text-center py-12">
                        <div className="text-red-500 mb-4">
                            <h3 className="text-xl font-semibold">Something went wrong</h3>
                            <p className="text-slate-600 mt-2">Unable to load featured products</p>
                        </div>
                        <Button type="primary" onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <div className="w-11/12 2xl:w-[88%] max-w-[105.6rem] mx-auto">
                {/* Header */}
                <div className="mb-8 lg:mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl xl:text-4xl font-bold text-slate-900 mb-2 md:mb-3 xl:mb-4">
                            Featured Products
                        </h2>
                        <p className="text-slate-600 text-sm md:text-base xl:text-lg">
                            Discover our handpicked selection with exclusive discounts
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
                {products.length > 0 && (
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
                        loop={products.length > 3}
                        className="!pb-16 !pt-2"
                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={product._id} className="cursor-pointer">
                                <ProductCard product={product} index={index} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                {/* Empty State */}
                {!isLoading && products.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-slate-500 mb-4">
                            <h3 className="text-xl font-semibold">No Featured Products</h3>
                            <p className="text-slate-600 mt-2">Check back later for exciting deals</p>
                        </div>
                    </div>
                )}

                {/* View All Link - Bottom Right */}
                <div className="flex justify-end mt-4">
                    <Link href="/products">
                        <motion.p
                            className="text-sm font-semibold text-blue-600 flex items-center gap-2 hover:text-blue-700 transition-colors cursor-pointer"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            View All <ArrowRightOutlined />
                        </motion.p>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts