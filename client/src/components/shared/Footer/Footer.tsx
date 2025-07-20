'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button, Space, Divider } from 'antd'
import { 
  FacebookOutlined, 
  InstagramOutlined, 
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 to-blue-50 pt-8 pb-3">
      <div className="w-11/12 2xl:w-[88%] max-w-[105.6rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
        
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/" className="flex items-center mb-3">
            <Image
              src="/logo/gear-guild-logo.png"
              alt="GearGuild Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </Link>
          <p className="text-slate-600 text-xs max-w-xs leading-relaxed">
            Your trusted destination for premium electronics and cutting-edge technology. 
            Quality products with reliable service and fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div className="hidden md:block">
          <h3 className="uppercase text-sm font-bold text-slate-500 mb-3">Quick Links</h3>
          <div className="space-y-2">
            <div>
              <Link 
                href="/" 
                className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
              >
                Home
              </Link>
            </div>
            <div>
              <Link 
                href="/products" 
                className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
              >
                All Products
              </Link>
            </div>
            <div>
              <Link 
                href="/contact" 
                className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="uppercase text-sm font-bold text-slate-500 mb-3">Connect With Us</h3>
          
          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-end gap-1 mb-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MailOutlined className="text-blue-600" />
              <span>support@gearguild.com</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <PhoneOutlined className="text-blue-600" />
              <span>+880-1XXX-XXXXXX</span>
            </div>
          </div>

          {/* Social Media - Updated with larger icons */}
          <Space size="middle">
            <Button
              type="text"
              shape="circle"
              size="large"
              icon={<FacebookOutlined style={{ fontSize: '18px' }} />}
              href="https://www.facebook.com/QtecSolution"
              target="_blank"
              className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            />
            <Button
              type="text"
              shape="circle"
              size="large"
              icon={<InstagramOutlined style={{ fontSize: '18px' }} />}
              href="https://www.instagram.com/qtecsolution"
              target="_blank"
              className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            />
            <Button
              type="text"
              shape="circle"
              size="large"
              icon={<LinkedinOutlined style={{ fontSize: '18px' }} />}
              href="https://www.linkedin.com/company/qtec-solution"
              target="_blank"
              className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            />
          </Space>
        </div>
      </div>

      {/* Mobile Quick Links */}
      <div className="md:hidden mb-6">
        <Divider className="my-4" />
        <div className="flex justify-center gap-8">
          <Link 
            href="/" 
            className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            Home
          </Link>
          <Link 
            href="/products" 
            className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            All Products
          </Link>
          <Link 
            href="/contact" 
            className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <Divider className="border-slate-300 !mb-3" />
      <div className="text-center text-slate-500 text-xs">
        © {new Date().getFullYear()} GearGuild. All rights reserved.
      </div>
    </footer>
  )
}