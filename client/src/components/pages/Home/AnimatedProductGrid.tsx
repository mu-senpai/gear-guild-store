'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Product {
  id: number
  name: string
  image: string
  isHero?: boolean
}

export function AnimatedProductGrid() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-[500px] lg:h-[600px] flex items-center justify-center">
        <div className="animate-pulse bg-slate-100 rounded-3xl w-80 h-96"></div>
      </div>
    )
  }

  const products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      image: '/images/iPhone_15_Pro_Max.png',
      isHero: true,
    },
    {
      id: 2,
      name: 'Sony WH-1000XM5',
      image: '/images/Sony_HP.png',
    },
    {
      id: 3,
      name: 'MX Master 3S',
      image: '/images/MX_Master.png',
    },
    {
      id: 4,
      name: 'Dell XPS 13',
      image: '/images/Dell_XPS.png',
    },
  ]

  const heroProduct = products.find(p => p.isHero)
  const supportingProducts = products.filter(p => !p.isHero)

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Hero Product - Center Stage */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <motion.div
          className="relative w-72 h-96"
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        >
          <Image
            src={heroProduct?.image || ''}
            alt={heroProduct?.name || ''}
            fill
            className="object-contain drop-shadow-2xl"
            sizes="(max-width: 768px) 288px, 320px"
            priority
          />
          
          {/* Hero Product Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 rounded-3xl blur-3xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Supporting Products - Fixed Positioning */}
      {supportingProducts.map((product, index) => {
        // Updated positioning values for better spacing and visual balance
        const positions = [
          { x: -210, y: -180, rotation: -12 }, // Top left - Sony Headphones
          { x: 220, y: 0, rotation: 8 },    // Top right - MX Master Mouse  
          { x: -220, y: 180, rotation: 15 },   // Bottom left - Dell Laptop
        ]
        
        const position = positions[index] || { x: 0, y: 0, rotation: 0 }

        return (
          <motion.div
            key={product.id}
            className="absolute hidden sm:block z-5"
            style={{
              left: '50%',
              top: '50%',
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.5,
              x: position.x - 64, // Adjusted for center alignment
              y: position.y - 64,
              rotate: position.rotation + 20,
            }}
            animate={{ 
              opacity: 0.6, 
              scale: 1,
              x: position.x - 64,
              y: position.y - 64,
              rotate: position.rotation,
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut", 
              delay: 0.4 + index * 0.2 
            }}
            whileHover={{
              opacity: 1,
              scale: 1.15,
              rotate: 0,
              z: 20,
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative w-28 h-28 lg:w-32 lg:h-32">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-lg"
                sizes="128px"
              />
              
              {/* Supporting Product Subtle Glow */}
              <motion.div
                className="absolute inset-0 bg-white/40 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </motion.div>
        )
      })}

      {supportingProducts.map((product, index) => {
        // Updated positioning values for better spacing and visual balance
        const positions = [
          { x: -135, y: -180, rotation: -12 }, // Top left - Sony Headphones
          { x: 160, y: 0, rotation: 8 },    // Top right - MX Master Mouse  
          { x: -125, y: 220, rotation: 15 },   // Bottom left - Dell Laptop
        ]
        
        const position = positions[index] || { x: 0, y: 0, rotation: 0 }

        return (
          <motion.div
            key={product.id}
            className="absolute sm:hidden z-5"
            style={{
              left: '50%',
              top: '50%',
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.5,
              x: position.x - 64, // Adjusted for center alignment
              y: position.y - 64,
              rotate: position.rotation + 20,
            }}
            animate={{ 
              opacity: 0.6, 
              scale: 1,
              x: position.x - 64,
              y: position.y - 64,
              rotate: position.rotation,
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut", 
              delay: 0.4 + index * 0.2 
            }}
            whileHover={{
              opacity: 1,
              scale: 1.15,
              rotate: 0,
              z: 20,
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative w-24 h-24">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-lg"
                sizes="128px"
              />
              
              {/* Supporting Product Subtle Glow */}
              <motion.div
                className="absolute inset-0 bg-white/40 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </motion.div>
        )
      })}

      {/* Minimalist Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient circle behind hero */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-50/80 to-slate-50/80 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}