'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { CloseOutlined, ShoppingCartOutlined, PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Empty, Divider } from 'antd'
import Image from 'next/image'
import { RootState } from '@/redux/store/store'
import { closeCart, openCheckoutModal } from '@/redux/services/ui/uiSlice'
import {
    useGetCartQuery,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
    useClearCartMutation
} from '@/redux/api/cart/cartApi'
import { SessionManager } from '@/utils/sessionManager'
import { setCartItems } from '@/redux/services/cart/cartSlice'
import { toast } from 'sonner'

export function CartSidebar() {
    const dispatch = useDispatch()
    const { isCartOpen } = useSelector((state: RootState) => state.ui)
    const sessionId = SessionManager.getSessionId()

    // RTK Query hooks
    const { data: cartData, isLoading } = useGetCartQuery(sessionId, {
        skip: !sessionId || !isCartOpen
    })

    const [updateCartItem] = useUpdateCartItemMutation()
    const [removeFromCart] = useRemoveFromCartMutation()
    const [clearCart] = useClearCartMutation()

    // Update Redux store when cart data changes
    useEffect(() => {
        if (cartData?.data?.items) {
            dispatch(setCartItems(cartData.data.items))
        }
    }, [cartData, dispatch])

    const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
        try {
            if (newQuantity === 0) {
                await removeFromCart({ sessionId, productId }).unwrap()
                toast.success('Item removed from cart')
            } else {
                await updateCartItem({ sessionId, productId, quantity: newQuantity }).unwrap()
                toast.success('Cart updated')
            }
        } catch (error) {
            console.log('Failed to update cart:', error)
            toast.error('Failed to update cart')
        }
    }

    const handleRemoveItem = async (productId: string) => {
        try {
            await removeFromCart({ sessionId, productId }).unwrap()
            toast.success('Item removed from cart')
        } catch (error) {
            console.log('Failed to remove item:', error)
            toast.error('Failed to remove item')
        }
    }

    const handleClearCart = async () => {
        try {
            await clearCart(sessionId).unwrap()
            toast.success('Cart cleared')
        } catch (error) {
            console.log('Failed to clear cart:', error)
            toast.error('Failed to clear cart')
        }
    }

    const cartItems = cartData?.data?.items || []
    const totalAmount = cartData?.data?.summary?.totalAmount || 0
    const totalItems = cartData?.data?.summary?.totalItems || 0

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-[50]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => dispatch(closeCart())}
                    />

                    {/* Cart Sidebar */}
                    <motion.div
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto"
                        initial={{ x: 448 }}
                        animate={{ x: 0 }}
                        exit={{ x: 448 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 h-24 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <ShoppingCartOutlined className="text-blue-600 text-lg" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">Shopping Cart</h2>
                                    <p className="text-sm text-slate-500">{totalItems} items</p>
                                </div>
                            </div>
                            <motion.button
                                onClick={() => dispatch(closeCart())}
                                className="p-2 rounded-lg hover:bg-white transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <CloseOutlined className="text-lg text-slate-600" />
                            </motion.button>
                        </div>

                        {/* Cart Content */}
                        <div className="flex-1">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : cartItems.length === 0 ? (
                                <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description="Your cart is empty"
                                    >
                                        <Button type="primary" onClick={() => dispatch(closeCart())}>
                                            Start Shopping
                                        </Button>
                                    </Empty>
                                </div>
                            ) : (
                                <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-19rem)]">
                                    {cartItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            className="bg-slate-50 rounded-xl p-4 border border-slate-200"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="flex items-start space-x-3">
                                                {/* Product Image */}
                                                <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-contain p-1"
                                                        sizes="64px"
                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-slate-800 text-sm truncate">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-blue-600 font-semibold mt-1">
                                                        ${item.price.toFixed(2)}
                                                    </p>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center justify-between mt-3">
                                                        <div className="flex items-center space-x-2">
                                                            <motion.button
                                                                onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                                                                className="w-7 h-7 rounded-md border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors"
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                <MinusOutlined className="text-xs text-slate-600" />
                                                            </motion.button>

                                                            <span className="w-8 text-center text-sm font-medium text-slate-700">
                                                                {item.quantity}
                                                            </span>

                                                            <motion.button
                                                                onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                                                className="w-7 h-7 rounded-md border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors"
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                <PlusOutlined className="text-xs text-slate-600" />
                                                            </motion.button>
                                                        </div>

                                                        <motion.button
                                                            onClick={() => handleRemoveItem(item.productId)}
                                                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <DeleteOutlined className="text-sm" />
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Clear Cart Button */}
                                    {cartItems.length > 0 && (
                                        <div className="pt-4">
                                            <Button
                                                danger
                                                ghost
                                                block
                                                onClick={handleClearCart}
                                                icon={<DeleteOutlined />}
                                            >
                                                Clear Cart
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer with Total and Checkout */}
                        {cartItems.length > 0 && (
                            <div className="border-t h-52 border-slate-200 p-6 bg-slate-50 absolute bottom-0 left-0 right-0">
                                <div className="space-y-4">
                                    {/* Total */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold text-slate-800">Total</span>
                                        <span className="text-xl font-bold text-blue-600">
                                            ${totalAmount.toFixed(2)}
                                        </span>
                                    </div>

                                    <Divider className="my-4" />

                                    {/* Checkout Button */}
                                    <Button
                                        type="primary"
                                        size="large"
                                        block
                                        onClick={() => dispatch(openCheckoutModal())}
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 h-12 text-base font-semibold"
                                    >
                                        Proceed to Checkout
                                    </Button>

                                    {/* Continue Shopping */}
                                    <Button
                                        block
                                        onClick={() => dispatch(closeCart())}
                                        className="h-10"
                                    >
                                        Continue Shopping
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}