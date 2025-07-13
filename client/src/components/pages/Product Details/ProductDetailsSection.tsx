'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import {
    Button,
    Badge,
    Divider,
    InputNumber,
    Rate,
    Tag,
    Breadcrumb
} from 'antd'
import {
    ShoppingCartOutlined,
    HeartOutlined,
    ShareAltOutlined,
    CheckCircleOutlined,
    TruckOutlined,
    SafetyOutlined,
    HomeOutlined
} from '@ant-design/icons'
import { useAddToCartMutation } from '@/redux/api/cart/cartApi'
import { openCart } from '@/redux/services/ui/uiSlice'
import { SessionManager } from '@/utils/sessionManager'
import { formatPrice, calculateDiscountPercentage, parseDescription } from '@/utils/productHelpers'
import { toast } from 'sonner'
import { Product } from '@/types/api'

interface ProductDetailsSectionProps {
    product: Product
}

export function ProductDetailsSection({ product }: ProductDetailsSectionProps) {
    const [quantity, setQuantity] = useState(1)
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [addToCart, { isLoading }] = useAddToCartMutation()
    const dispatch = useDispatch()

    const sessionId = SessionManager.getSessionId()
    const effectivePrice = product.discountedPrice || product.price
    const hasDiscount = product.discountedPrice !== null
    const discountPercentage = hasDiscount
        ? calculateDiscountPercentage(product.price, product.discountedPrice!)
        : 0

    const { specifications, features } = parseDescription(product.description)

    const handleAddToCart = async () => {
        if (!product.inStock) {
            toast.error('Product is out of stock')
            return
        }

        try {
            await addToCart({
                sessionId,
                productId: product._id,
                quantity
            }).unwrap()

            toast.success(`Added ${quantity} item(s) to cart!`)
            dispatch(openCart())
        } catch (error) {
            console.log('Add to cart error:', error)
            toast.error('Failed to add to cart')
        }
    }

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted)
        if (!isWishlisted) {
            toast.success('Added to wishlist!')
        } else {
            toast.info('Removed from wishlist')
        }
    }

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: product.title,
                    text: `Check out this amazing product: ${product.title}`,
                    url: window.location.href,
                })
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(window.location.href)
                toast.success('Product link copied to clipboard!')
            }
        } catch (error) {
            console.log('Share error:', error)
            toast.error('Unable to share product')
        }
    }

    return (
        <section className="pt-24 md:pt-28 lg:pt-32">
            <div className="w-11/12 2xl:w-[88%] max-w-[105.6rem] mx-auto">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                >
                    <Breadcrumb
                        items={[
                            {
                                href: '/',
                                title: <HomeOutlined />,
                            },
                            {
                                href: '/products',
                                title: 'Products',
                            },
                            {
                                title: product.category,
                            },
                            {
                                title: product.title,
                            },
                        ]}
                        className='sm:!text-base xl:!text-lg'
                    />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 py-6 lg:py-12">

                    {/* Product Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative aspect-square rounded-2xl overflow-hidden">
                            {/* Discount Badge */}
                            {hasDiscount && (
                                <div
                                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs absolute top-4 left-4 z-10 font-semibold shadow-md"
                                >
                                    {discountPercentage}% OFF
                                </div>
                            )}

                            {/* Out of Stock Overlay */}
                            {!product.inStock && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                    <span className="text-white font-semibold text-xl">Out of Stock</span>
                                </div>
                            )}

                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />

                            {/* Additional Action Buttons - Now Active */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                                <Button
                                    shape="circle"
                                    icon={<HeartOutlined style={{ color: isWishlisted ? '#ef4444' : undefined }} />}
                                    onClick={handleWishlist}
                                    className="bg-white/90 border-0 shadow-md hover:bg-white"
                                />
                                <Button
                                    shape="circle"
                                    icon={<ShareAltOutlined />}
                                    onClick={handleShare}
                                    className="bg-white/90 border-0 shadow-md hover:bg-white"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Product Information Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Category & Title */}
                        <div>
                            <Tag color="blue" className="!mb-3">{product.category}</Tag>
                            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                                {product.title}
                            </h1>

                            {/* Rating (Mock) */}
                            <div className="flex items-center gap-3 mb-4">
                                <Rate disabled defaultValue={4.5} allowHalf />
                                <span className="text-slate-600 text-sm">(4.5/5 - 128 reviews)</span>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                {hasDiscount && (
                                    <span className="text-2xl text-slate-500 line-through">
                                        {formatPrice(product.price)}
                                    </span>
                                )}
                                <span className="text-3xl lg:text-4xl font-bold text-blue-600">
                                    {formatPrice(effectivePrice)}
                                </span>
                            </div>

                            {hasDiscount && (
                                <div className="flex items-center gap-3">
                                    <span className="text-green-600 font-semibold">
                                        Save {formatPrice(product.price - effectivePrice)}
                                    </span>
                                    <Badge
                                        count={`${discountPercentage}% OFF`}
                                        style={{ backgroundColor: '#10b981' }}
                                    />
                                </div>
                            )}
                        </div>

                        <Divider />

                        {/* Specifications */}
                        {specifications.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Specifications</h3>
                                <ul className="space-y-2">
                                    {specifications.slice(0, 4).map((spec, index) => (
                                        <li key={index} className="flex items-start gap-2 text-slate-600">
                                            <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                                            <span>{spec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Features */}
                        {features.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-3">Features</h3>
                                <div className="flex flex-wrap gap-2">
                                    {features.slice(0, 6).map((feature, index) => (
                                        <Tag key={index} color="geekblue">{feature}</Tag>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Divider />

                        {/* Quantity & Add to Cart */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="font-semibold text-slate-800">Quantity:</span>
                                <InputNumber
                                    min={1}
                                    max={10}
                                    value={quantity}
                                    onChange={(value) => setQuantity(value || 1)}
                                    className="w-20"
                                />
                                {product.inStock ? (
                                    <span className="text-green-600 text-sm font-medium">
                                        <CheckCircleOutlined className="mr-1" />
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="text-red-600 text-sm font-medium">
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<ShoppingCartOutlined />}
                                    onClick={handleAddToCart}
                                    loading={isLoading}
                                    className={`sm:flex-1 !h-12 font-semibold ${
                                        product.inStock 
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-0 hover:from-blue-700 hover:to-blue-800' 
                                            : 'bg-gradient-to-r from-gray-400 to-gray-500 border-0 hover:from-gray-500 hover:to-gray-600'
                                    }`}
                                >
                                    {product.inStock ? 'Add to Cart' : 'Notify When Available'}
                                </Button>

                                <Button
                                    size="large"
                                    icon={<HeartOutlined style={{ color: isWishlisted ? '#ef4444' : undefined }} />}
                                    onClick={handleWishlist}
                                    className="!h-12 font-semibold"
                                >
                                    {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                </Button>
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <TruckOutlined className="text-blue-600" />
                                <span>Free delivery across the country</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <SafetyOutlined className="text-green-600" />
                                <span>1 year manufacturer warranty</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <CheckCircleOutlined className="text-blue-600" />
                                <span>30-day return policy</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}