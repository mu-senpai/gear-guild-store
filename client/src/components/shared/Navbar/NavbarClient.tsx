'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons'
import { Badge } from 'antd'
import { RootState } from '@/redux/store/store'
import { toggleMobileMenu, openCart } from '@/redux/services/ui/uiSlice'

export function NavbarClient() {
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const pathname = usePathname()
    const dispatch = useDispatch()

    const { totalItems } = useSelector((state: RootState) => state.cart)
    const { scrollY } = useScroll()

    // Scroll behavior for show/hide navbar
    useMotionValueEvent(scrollY, "change", (latest) => {
        const currentScrollY = latest

        if (currentScrollY < 10) {
            // Always show navbar at top
            setIsVisible(true)
        } else if (currentScrollY > lastScrollY) {
            // Scrolling down - hide navbar
            setIsVisible(false)
        } else {
            // Scrolling up - show navbar
            setIsVisible(true)
        }

        setLastScrollY(currentScrollY)
    })

    const navigationItems = [
        { name: 'All Products', href: '/products' },
        { name: 'Contact Us', href: '/contact' }
    ]

    const isActiveLink = (href: string) => {
        if (href === '/products') {
            return pathname === '/products' || pathname.startsWith('/products/')
        }
        return pathname === href
    }

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200"
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="w-11/12 2xl:w-[88%] max-w-[105.6rem] mx-auto">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Mobile Menu Button - Left */}
                    <div className="md:hidden">
                        <motion.button
                            onClick={() => dispatch(toggleMobileMenu())}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <MenuOutlined className="text-xl text-slate-700" />
                        </motion.button>
                    </div>

                    {/* Logo - Left on desktop, Center on mobile */}
                    <div className="flex-1 md:flex-none flex justify-center md:justify-start">
                        <Link href="/" className="flex items-center">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Image
                                    src="/logo/qtech-store-logo.png" 
                                    alt="Qtech Store"
                                    width={120}
                                    height={40}
                                    className="h-10 xl:h-16 w-auto"
                                />
                            </motion.div>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Hidden on mobile */}
                    <nav className="hidden md:flex items-center space-x-3">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActiveLink(item.href)
                                        ? 'text-blue-600'
                                        : 'text-slate-700 hover:text-blue-600'
                                    }`}
                            >
                                {item.name}

                                {/* Active indicator */}
                                {isActiveLink(item.href) && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                        layoutId="activeTab"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Cart Button */}
                    <div className="flex items-center">
                        <motion.button
                            onClick={() => dispatch(openCart())}
                            className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Badge count={totalItems} size="small" offset={[-2, 2]}>
                                <ShoppingCartOutlined className="text-xl text-slate-700" />
                            </Badge>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.header>
    )
}