'use client'

import { motion, Variants } from 'framer-motion'
import { Form, Input, Button, Row, Col, Card } from 'antd'
import {
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    SendOutlined,
    ClockCircleOutlined,
    CustomerServiceOutlined
} from '@ant-design/icons'
import { toast } from 'sonner'

const { TextArea } = Input

interface ContactFormData {
    name: string
    email: string
    phone?: string
    subject: string
    message: string
}

export function ContactSection() {
    const [form] = Form.useForm()

    const handleSubmit = (values: ContactFormData) => {
        // Console log the form data
        console.log('Contact Form Data:', values)

        // Reset all form fields
        form.resetFields()

        // Show success toast
        toast.success('Thank you! Your message has been sent successfully. We\'ll get back to you soon.')
    }

    const contactInfo = [
        {
            icon: MailOutlined,
            title: 'Email Us',
            content: 'support@gearguild.com',
            description: 'Send us an email anytime',
            color: 'text-blue-600'
        },
        {
            icon: PhoneOutlined,
            title: 'Call Us',
            content: '+880-1XXX-XXXXXX',
            description: 'Mon-Sat 9AM-6PM',
            color: 'text-green-600'
        },
        {
            icon: EnvironmentOutlined,
            title: 'Visit Us',
            content: 'Dhaka, Bangladesh',
            description: 'Our office location',
            color: 'text-purple-600'
        },
        {
            icon: ClockCircleOutlined,
            title: 'Business Hours',
            content: 'Mon-Sat: 9AM-6PM',
            description: 'Sunday: Closed',
            color: 'text-orange-600'
        }
    ]

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <div className="w-11/12 2xl:w-[88%] max-w-[105.6rem] mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <Row gutter={[32, 32]} align="stretch">
                        {/* Contact Information */}
                        <Col xs={24} lg={10}>
                            <motion.div variants={itemVariants} className="h-full">
                                <Card className="h-full !border-0">
                                    <div className="space-y-8">
                                        <div className="text-center mb-8">
                                            <CustomerServiceOutlined className="text-4xl text-blue-600 mb-4" />
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                                Contact Information
                                            </h3>
                                            <p className="text-slate-600">
                                                Multiple ways to reach our support team
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            {contactInfo.map((info) => {
                                                const IconComponent = info.icon
                                                return (
                                                    <motion.div
                                                        key={info.title}
                                                        variants={itemVariants}
                                                        className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                                    >
                                                        <div className={`p-3 rounded-lg bg-slate-100 ${info.color}`}>
                                                            <IconComponent className="text-xl" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-slate-800 mb-1">
                                                                {info.title}
                                                            </h4>
                                                            <p className="font-medium text-slate-900 mb-1">
                                                                {info.content}
                                                            </p>
                                                            <p className="text-sm text-slate-600">
                                                                {info.description}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </Col>

                        {/* Contact Form */}
                        <Col xs={24} lg={14}>
                            <motion.div variants={itemVariants}>
                                <Card className="!border-0 h-full">
                                    <div className="text-center mb-8">
                                        <SendOutlined className="text-4xl text-blue-600 mb-4" />
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                            Send us a Message
                                        </h3>
                                        <p className="text-slate-600">
                                            Fill out the form below and we&apos;ll respond within 24 hours
                                        </p>
                                    </div>

                                    <Form
                                        form={form}
                                        layout="vertical"
                                        onFinish={handleSubmit}
                                        size="large"
                                        className="space-y-4"
                                    >
                                        <Row gutter={16}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    label="Full Name"
                                                    name="name"
                                                    rules={[
                                                        { required: true, message: 'Please enter your full name' },
                                                        { min: 2, message: 'Name must be at least 2 characters' }
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="Enter your full name"
                                                        className="rounded-lg"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    label="Email Address"
                                                    name="email"
                                                    rules={[
                                                        { required: true, message: 'Please enter your email' },
                                                        { type: 'email', message: 'Please enter a valid email' }
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="Enter your email address"
                                                        className="rounded-lg"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    label="Phone Number (Optional)"
                                                    name="phone"
                                                    rules={[
                                                        { pattern: /^[0-9+\-\s()]*$/, message: 'Please enter a valid phone number' }
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="Enter your phone number"
                                                        className="rounded-lg"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    label="Subject"
                                                    name="subject"
                                                    rules={[
                                                        { required: true, message: 'Please enter a subject' },
                                                        { min: 5, message: 'Subject must be at least 5 characters' }
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="What is this about?"
                                                        className="rounded-lg"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Form.Item
                                            label="Message"
                                            name="message"
                                            rules={[
                                                { required: true, message: 'Please enter your message' },
                                                { min: 10, message: 'Message must be at least 10 characters' },
                                                { max: 1000, message: 'Message cannot exceed 1000 characters' }
                                            ]}
                                        >
                                            <TextArea
                                                rows={6}
                                                placeholder="Tell us more about your inquiry..."
                                                className="rounded-lg"
                                                autoSize={{ minRows: 6, maxRows: 10 }}
                                                showCount
                                                maxLength={1000}
                                            />
                                        </Form.Item>

                                        <Form.Item className="mb-0">
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                size="large"
                                                icon={<SendOutlined />}
                                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 border-0 hover:from-blue-700 hover:to-blue-800 font-semibold rounded-lg"
                                            >
                                                Send Message
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </motion.div>
                        </Col>
                    </Row>
                </motion.div>
            </div>
        </section>
    )
}