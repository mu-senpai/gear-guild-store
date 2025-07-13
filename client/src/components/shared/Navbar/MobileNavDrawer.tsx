'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CloseOutlined, HomeOutlined, ShoppingOutlined, PhoneOutlined } from '@ant-design/icons'
import { RootState } from '@/redux/store/store'
import { closeMobileMenu } from '@/redux/services/ui/uiSlice'

export function MobileNavDrawer() {
    const dispatch = useDispatch()
    const pathname = usePathname()
    const { isMobileMenuOpen } = useSelector((state: RootState) => state.ui)

    const navigationItems = [
        { name: 'Home', href: '/', icon: HomeOutlined },
        { name: 'All Products', href: '/products', icon: ShoppingOutlined },
        { name: 'Contact Us', href: '/contact', icon: PhoneOutlined }
    ]

    const isActiveLink = (href: string) => {
        if (href === '/') return pathname === '/'
        if (href === '/products') return pathname === '/products' || pathname.startsWith('/products/')
        return pathname === href
    }

    const handleLinkClick = () => {
        dispatch(closeMobileMenu())
    }

    return (
        <AnimatePresence>
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-[50] md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => dispatch(closeMobileMenu())}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-2xl md:hidden"
                        initial={{ x: -320 }}
                        animate={{ x: 0 }}
                        exit={{ x: -320 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-200">
                            <Image
                                src="/logo/qtech-store-logo.png"
                                alt="Qtech Store"
                                width={120}
                                height={40}
                                className="h-8 w-auto"
                            />
                            <motion.button
                                onClick={() => dispatch(closeMobileMenu())}
                                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <CloseOutlined className="text-lg text-slate-600" />
                            </motion.button>
                        </div>

                        {/* Navigation */}
                        <nav className="p-6">
                            <div className="space-y-2">
                                {navigationItems.map((item, index) => {
                                    const IconComponent = item.icon
                                    const isActive = isActiveLink(item.href)

                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1, duration: 0.3 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={handleLinkClick}
                                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                                        : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                                                    }`}
                                            >
                                                <IconComponent className={`text-lg ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                                                <span className="font-medium">{item.name}</span>

                                                {/* Active indicator */}
                                                {isActive && (
                                                    <motion.div
                                                        className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.2 }}
                                                    />
                                                )}
                                            </Link>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </nav>

                        {/* Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white border-slate-200">
                            <div className="text-center">
                                <p className="text-sm text-slate-500">
                                    Premium Tech Store
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                    Quality • Service • Innovation
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}