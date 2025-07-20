'use client'

import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'antd'
import { CheckCircleOutlined, ShoppingOutlined, HomeOutlined } from '@ant-design/icons'
import { RootState } from '@/redux/store/store'
import { closeSuccessModal } from '@/redux/services/ui/uiSlice'
import { useRouter } from 'next/navigation'

export function SuccessModal() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { isSuccessModalOpen } = useSelector((state: RootState) => state.ui)

    const handleClose = () => {
        dispatch(closeSuccessModal())
    }

    const handleContinueShopping = () => {
        dispatch(closeSuccessModal())
        router.push('/products')
    }

    const handleGoHome = () => {
        dispatch(closeSuccessModal())
        router.push('/')
    }

    // Generate mock order number
    const orderNumber = `QT${Date.now().toString().slice(-6)}`

    return (
        <Modal
            open={isSuccessModalOpen}
            onCancel={handleClose}
            footer={null}
            width={500}
            className="success-modal"
            centered
        >
            <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Success Icon */}
                <motion.div
                    className="mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircleOutlined className="text-4xl text-green-600" />
                    </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        Order Placed Successfully!
                    </h2>
                    <p className="text-slate-600 mb-6">
                        Thank you for shopping with GearGuild. Your order has been confirmed
                        and will be processed shortly.
                    </p>
                </motion.div>

                {/* Order Details */}
                <motion.div
                    className="bg-blue-50 rounded-lg p-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <div className="text-sm text-slate-600 mb-1">Order Number</div>
                    <div className="text-lg font-bold text-blue-600">#{orderNumber}</div>
                </motion.div>

                {/* What's Next */}
                <motion.div
                    className="bg-slate-50 rounded-lg p-4 mb-6 text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <h3 className="font-semibold text-slate-800 mb-3">What&apos;s Next?</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            You&apos;ll receive an email confirmation shortly
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Your order will be processed within 24 hours
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            Free delivery within 3-5 business days
                        </li>
                    </ul>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <Button
                        size="large"
                        icon={<ShoppingOutlined />}
                        onClick={handleContinueShopping}
                        className="sm:flex-1 h-12 font-semibold"
                    >
                        Continue Shopping
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        icon={<HomeOutlined />}
                        onClick={handleGoHome}
                        className="sm:flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 border-0 font-semibold"
                    >
                        Go to Home
                    </Button>
                </motion.div>
            </motion.div>
        </Modal>
    )
}