'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface PageBannerProps {
    title: string
}

export function PageBanner({ title }: PageBannerProps) {
    return (
        <section className="relative min-h-[15rem] bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
            <div className="w-11/12 2xl:w-[88%] max-w-[105.6rem] mx-auto">
                <div className="flex flex-col justify-center min-h-[15rem] pt-20 pb-4 md:pt-28 md:pb-8 lg:pt-36 lg:pb-16 xl:pt-48 xl:pb-28">

                    {/* Title */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.1
                        }}
                    >
                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-blue-600 bg-clip-text text-transparent">
                            {title}
                        </h1>
                    </motion.div>

                </div>
            </div>

            {/* Logo Overlay Bottom Right */}
            <motion.div
                className="pointer-events-none absolute -bottom-20 -right-10 lg:-right-35 xl:-right-50 2xl:-right-50 w-3/4 sm:w-2/5 lg:w-5/12 xl::w-3/12 min-h-[15rem] aspect-square opacity-15 select-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.3
                }}
            >
                <Image
                    src="/logo/logo-overlay.png"
                    alt="GearGuild Logo"
                    fill
                    className="object-cover"
                    priority={false}
                />
            </motion.div>
        </section>
    )
}