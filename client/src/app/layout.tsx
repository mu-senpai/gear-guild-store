import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { Toaster } from "sonner";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Navbar } from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import { CheckoutContainer } from "@/components/pages/Checkout/CheckoutContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Store - Premium Electronics",
  description: "Discover the latest mobiles, laptops, and accessories at Tech Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <ReduxProvider>
            <Navbar />
            {children}
            <Footer />
            <CheckoutContainer />
            <Toaster position="top-center" richColors />
          </ReduxProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}