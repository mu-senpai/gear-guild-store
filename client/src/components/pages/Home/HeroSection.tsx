'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { HeroContent } from './HeroContent'
import { AnimatedProductGrid } from './AnimatedProductGrid'

export default function HeroSection() {
  return (
    <section className="relative min-h-[30rem] bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div className="w-11/12 2xl:w-[88%] max-w-[105.6rem] mx-auto">
        <div className="flex flex-col xl:flex-row items-center justify-center gap-10 xl:gap-0 lg:justify-between min-h-[70vh] lg:min-h-[65vh] xl:min-h-[30rem] pt-28 sm:pt-36 md:pt-40 pb-8 lg:pt-44 xl:pt-24 xl:pb-0">
          {/* Left Content Section */}
          <div className="w-full xl:w-1/2 space-y-8">
            <HeroContent />
          </div>

          {/* Right Animation Section */}
          <div className="w-full xl:w-1/2 flex justify-center">
            <AnimatedProductGrid />
          </div>
        </div>
      </div>

      {/* Animated Logo Overlay Bottom Right */}
      <motion.div
        className="pointer-events-none absolute -bottom-20 -right-70 h-3/5 xl:h-full aspect-square opacity-15 select-none"
        initial={{
          opacity: 0,
          scale: 0.8,
          rotate: -5
        }}
        animate={{
          opacity: 0.15,
          scale: 1,
          rotate: 0
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 0.8
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