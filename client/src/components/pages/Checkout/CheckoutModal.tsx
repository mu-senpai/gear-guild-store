'use client'

import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import {
    Modal,
    Form,
    Input,
    Button,
    Divider,
    Row,
    Col,
    Card,
    Radio,
    Space
} from 'antd'
import {
    CloseOutlined,
    CreditCardOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    HomeOutlined,
    LockOutlined,
    CheckCircleOutlined,
    MobileOutlined
} from '@ant-design/icons'
import Image from 'next/image'
import { RootState } from '@/redux/store/store'
import { closeCheckoutModal, openSuccessModal } from '@/redux/services/ui/uiSlice'
import { useClearCartMutation } from '@/redux/api/cart/cartApi'
import { SessionManager } from '@/utils/sessionManager'
import { toast } from 'sonner'

interface CheckoutFormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
    paymentMethod: 'card' | 'bkash' | 'nagad'
    cardNumber?: string
    expiryDate?: string
    cvv?: string
    bkashNumber?: string
    nagadNumber?: string
}

export function CheckoutModal() {
    const dispatch = useDispatch()
    const { isCheckoutModalOpen } = useSelector((state: RootState) => state.ui)
    const { items: cartItems } = useSelector((state: RootState) => state.cart)
    const [form] = Form.useForm()
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash' | 'nagad'>('card')
    const [isProcessing, setIsProcessing] = useState(false)
    const [clearCart] = useClearCartMutation()

    const sessionId = SessionManager.getSessionId()

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = subtotal > 50 ? 0 : 10
    const total = subtotal + shipping

    const handleSubmit = async (values: CheckoutFormData) => {
        console.log('Form submitted:', values);
        setIsProcessing(true)

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Clear cart after successful payment
            await clearCart(sessionId).unwrap()

            // Clear the form after successful submission
            form.resetFields()

            // Close checkout modal and show success modal
            dispatch(closeCheckoutModal())
            dispatch(openSuccessModal())

            toast.success('Order placed successfully!')
        } catch (error) {
            console.log('Payment error:', error)
            toast.error('Payment failed. Please try again.')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleClose = () => {
        if (!isProcessing) {
            dispatch(closeCheckoutModal())
        }
    }

    return (
        <Modal
            open={isCheckoutModalOpen}
            onCancel={handleClose}
            footer={null}
            width={800}
            className="checkout-modal"
            closeIcon={<CloseOutlined className="text-slate-600" />}
            maskClosable={!isProcessing}
        >
            <div className="p-2">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Checkout</h2>
                    <p className="text-slate-600">Complete your order</p>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Row gutter={24} className='!space-y-6 !mb-6'>
                        {/* Left Column - Customer Information */}
                        <Col xs={24} md={14}>
                            <Card className="!mb-6 border-slate-200">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <UserOutlined className="text-blue-600" />
                                    Customer Information
                                </h3>

                                <Row gutter={16}>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label="First Name"
                                            name="firstName"
                                            rules={[{ required: true, message: 'Please enter your first name' }]}
                                        >
                                            <Input placeholder="John" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label="Last Name"
                                            name="lastName"
                                            rules={[{ required: true, message: 'Please enter your last name' }]}
                                        >
                                            <Input placeholder="Doe" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    label="Email Address"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please enter your email' },
                                        { type: 'email', message: 'Please enter a valid email' }
                                    ]}
                                >
                                    <Input prefix={<MailOutlined />} placeholder="john.doe@example.com" />
                                </Form.Item>

                                <Form.Item
                                    label="Phone Number"
                                    name="phone"
                                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                                >
                                    <Input prefix={<PhoneOutlined />} placeholder="+880 1XXX-XXXXXX" />
                                </Form.Item>
                            </Card>

                            {/* Shipping Address */}
                            <Card className="!mb-6 border-slate-200">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <HomeOutlined className="text-blue-600" />
                                    Shipping Address
                                </h3>

                                <Form.Item
                                    label="Address"
                                    name="address"
                                    rules={[{ required: true, message: 'Please enter your address' }]}
                                >
                                    <Input.TextArea rows={2} placeholder="House/Flat, Road, Area" />
                                </Form.Item>

                                <Row gutter={16}>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label="City"
                                            name="city"
                                            rules={[{ required: true, message: 'Please enter your city' }]}
                                        >
                                            <Input placeholder="Dhaka" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label="Postal Code"
                                            name="postalCode"
                                            rules={[{ required: true, message: 'Please enter postal code' }]}
                                        >
                                            <Input placeholder="1000" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>

                            {/* Payment Method */}
                            <Card className="border-slate-200">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <CreditCardOutlined className="text-blue-600" />
                                    Payment Method
                                </h3>

                                <Form.Item name="paymentMethod" initialValue="card">
                                    <Radio.Group
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-full"
                                    >
                                        <Space direction="vertical" className="w-full">
                                            <Radio value="card" className="w-full !p-3 !border !inline-flex !items-center !rounded-lg hover:bg-blue-50">
                                                <div className="flex items-center gap-3">
                                                    <CreditCardOutlined className="text-lg" />
                                                    <span>Credit/Debit Card</span>
                                                </div>
                                            </Radio>
                                            <Radio value="bkash" className="w-full !p-3 !border !inline-flex !items-center !rounded-lg hover:bg-pink-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 bg-pink-500 rounded flex items-center justify-center">
                                                        <span className="text-white text-xs font-bold">b</span>
                                                    </div>
                                                    <span>bKash</span>
                                                </div>
                                            </Radio>
                                            <Radio value="nagad" className="w-full !p-3 !border !inline-flex !items-center !rounded-lg hover:bg-orange-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
                                                        <span className="text-white text-xs font-bold">N</span>
                                                    </div>
                                                    <span>Nagad</span>
                                                </div>
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>

                                {/* Card Details */}
                                {paymentMethod === 'card' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 space-y-4"
                                    >
                                        <Form.Item
                                            label="Card Number"
                                            name="cardNumber"
                                            rules={[{ required: true, message: 'Please enter card number' }]}
                                        >
                                            <Input placeholder="1234 5678 9012 3456" maxLength={19} />
                                        </Form.Item>

                                        <Row gutter={16}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    label="Expiry Date"
                                                    name="expiryDate"
                                                    rules={[{ required: true, message: 'Please enter expiry date' }]}
                                                >
                                                    <Input placeholder="MM/YY" maxLength={5} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    label="CVV"
                                                    name="cvv"
                                                    rules={[{ required: true, message: 'Please enter CVV' }]}
                                                >
                                                    <Input
                                                        placeholder="123"
                                                        maxLength={4}
                                                        suffix={<LockOutlined className="text-slate-400" />}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </motion.div>
                                )}

                                {/* bKash Phone Number */}
                                {paymentMethod === 'bkash' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4"
                                    >
                                        <Form.Item
                                            label="bKash Account Number"
                                            name="bkashNumber"
                                            rules={[
                                                { required: true, message: 'Please enter your bKash number' },
                                                { pattern: /^(\+8801|01)[3-9]\d{8}$/, message: 'Please enter a valid Bangladeshi mobile number' }
                                            ]}
                                        >
                                            <Input
                                                prefix={<MobileOutlined className="text-pink-500" />}
                                                placeholder="01XXXXXXXXX"
                                                maxLength={11}
                                            />
                                        </Form.Item>
                                        <div className="text-xs text-slate-500 mt-2 p-3 bg-pink-50 rounded-lg">
                                            <CheckCircleOutlined className="text-pink-500 mr-2" />
                                            Make sure your bKash account has sufficient balance for the payment
                                        </div>
                                    </motion.div>
                                )}

                                {/* Nagad Phone Number */}
                                {paymentMethod === 'nagad' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4"
                                    >
                                        <Form.Item
                                            label="Nagad Account Number"
                                            name="nagadNumber"
                                            rules={[
                                                { required: true, message: 'Please enter your Nagad number' },
                                                { pattern: /^(\+8801|01)[3-9]\d{8}$/, message: 'Please enter a valid Bangladeshi mobile number' }
                                            ]}
                                        >
                                            <Input
                                                prefix={<MobileOutlined className="text-orange-500" />}
                                                placeholder="01XXXXXXXXX"
                                                maxLength={11}
                                            />
                                        </Form.Item>
                                        <div className="text-xs text-slate-500 mt-2 p-3 bg-orange-50 rounded-lg">
                                            <CheckCircleOutlined className="text-orange-500 mr-2" />
                                            Make sure your Nagad account has sufficient balance for the payment
                                        </div>
                                    </motion.div>
                                )}
                            </Card>
                        </Col>

                        {/* Right Column - Order Summary */}
                        <Col xs={24} md={10}>
                            <Card className="sticky top-0 border-slate-200 bg-slate-50">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Order Summary</h3>

                                {/* Cart Items */}
                                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3 p-2 bg-white rounded-lg">
                                            <div className="relative w-12 h-12 bg-white rounded overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-contain p-1"
                                                    sizes="48px"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-800 truncate">{item.title}</p>
                                                <p className="text-xs text-slate-600">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-semibold text-blue-600">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Divider className="!mb-6" />

                                {/* Order Totals */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Subtotal</span>
                                        <span className="text-slate-800">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Shipping</span>
                                        <span className="text-slate-800">
                                            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <Divider className="my-3" />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span className="text-slate-800">Total</span>
                                        <span className="text-blue-600">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Security Notice */}
                                <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                                    <CheckCircleOutlined className="text-green-600" />
                                    <span className="text-xs text-green-700">
                                        Your payment information is secure and encrypted
                                    </span>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-6 border-t">
                        <Button
                            onClick={handleClose}
                            size="large"
                            className="flex-1"
                            disabled={isProcessing}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={isProcessing}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 border-0 font-semibold"
                        >
                            {isProcessing ? 'Processing Payment...' : `Pay $${total.toFixed(2)}`}
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}