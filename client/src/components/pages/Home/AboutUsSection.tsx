'use client'

import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { CheckCircleOutlined, TrophyOutlined } from '@ant-design/icons'
import Link from 'next/link'

export function AboutUsSection() {
    const features = [
        {
            icon: CheckCircleOutlined,
            title: 'Quality Assured',
            description: 'Every product undergoes rigorous testing to ensure premium quality and reliability.'
        },
        {
            icon: TrophyOutlined,
            title: 'Industry Leaders',
            description: 'Trusted by thousands of customers with over 5 years of excellence in tech retail.'
        }
    ]

    const containerVariants = {
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
        <section className="pb-12 sm:pb-16 lg:pb-20">
            <div className="w-11/12 2xl:w-[88%] max-w-[105.6rem] mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid xl:grid-cols-2 gap-12 lg:gap-16 items-center"
                >
                    {/* Image Section */}
                    <motion.div
                        variants={itemVariants}
                        className="relative"
                    >
                        <div className="relative h-96 sm:h-[25rem] lg:h-[30rem] xl:h-[35rem] rounded-3xl overflow-hidden">
                            <Image
                                src="/images/About_Us.png"
                                alt="Tech enthusiast with premium gadgets - Qtech Store"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />

                            {/* Floating elements for visual interest */}
                            <motion.div
                                className="absolute top-8 right-8 bg-blue-50 backdrop-blur-sm p-4 rounded-2xl shadow-lg"
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <div className="text-center">
                                    <div className="text-xl font-bold text-blue-600">Premium</div>
                                    <div className="text-sm text-slate-600">Quality</div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute bottom-8 left-8 bg-blue-50 backdrop-blur-sm p-4 rounded-2xl shadow-lg"
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1,
                                }}
                            >
                                <div className="text-center">
                                    <div className="text-xl font-bold text-green-600">24/7</div>
                                    <div className="text-sm text-slate-600">Support</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        {/* Header */}
                        <div className="space-y-2 md:space-y-3 xl:space-y-4 text-left xl:text-right">
                            <motion.h2
                                className="text-3xl xl:text-4xl font-bold text-slate-900"
                                variants={itemVariants}
                            >
                                About{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                    Qtech Store
                                </span>
                            </motion.h2>

                            <motion.p
                                className="text-sm md:text-base xl:text-lg text-slate-600 leading-relaxed"
                                variants={itemVariants}
                            >
                                Your trusted destination for premium electronics and cutting-edge technology.
                                We&apos;re passionate about bringing you the latest innovations in mobiles, laptops,
                                and accessories from the world&apos;s leading brands.
                            </motion.p>
                        </div>

                        {/* Mission Statement */}
                        <motion.div
                            className="bg-white p-6 rounded-2xl shadow-md border border-blue-100"
                            variants={itemVariants}
                        >
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed">
                                To democratize access to premium technology by offering authentic products,
                                competitive prices, and exceptional customer service. We believe everyone
                                deserves to experience the best in tech innovation.
                            </p>
                        </motion.div>

                        {/* Features Grid */}
                        <motion.div
                            className="grid sm:grid-cols-2 gap-4"
                            variants={itemVariants}
                        >
                            {features.map((feature) => {
                                const IconComponent = feature.icon
                                return (
                                    <motion.div
                                        key={feature.title}
                                        className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100"
                                        whileHover={{ y: -4 }}
                                        variants={itemVariants}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <IconComponent className="text-blue-600 text-lg" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-800 mb-1">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-sm text-slate-600">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Bottom CTA Section */}
                <motion.div
                    className="mt-12 sm:mt-16 lg:mt-20 text-center"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-md border border-blue-200">
                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                            Ready to Experience Premium Tech?
                        </h3>
                        <p className="text-sm md:text-base xl:text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust Qtech Store for their technology needs.
                            Discover our curated selection of premium devices today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={`/products`} className='block'>
                                <motion.button
                                    className="px-4 lg:px-6 2xl:px-8 py-2 lg:py-3 2xl:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Explore Products
                                </motion.button>
                            </Link>
                            <Link href={`/contact`} className='block'>
                                <motion.button
                                    className="px-4 lg:px-6 2xl:px-8 py-2 lg:py-3 2xl:py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Contact Us
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}