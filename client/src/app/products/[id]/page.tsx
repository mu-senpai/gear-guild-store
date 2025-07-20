import fetchProduct from '@/actions/fetchProduct';
import { ProductDetailsClient } from '@/components/pages/Product Details/ProductDetailsClient'

interface ProductPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    return <ProductDetailsClient productId={id} />
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { id } = await params;

    // Fetch product data to get the actual product name
    const product = await fetchProduct(id)

    if (product) {
        return {
            title: `${product.title} - Qtech Store`,
            description: `${product.description || `Discover ${product.title} and other premium tech products at Qtech Store`}`,
            openGraph: {
                title: product.title,
                description: product.description,
                images: product.image ? [product.image] : [],
            }
        }
    }

    // Fallback metadata if product not found
    return {
        title: `Product ${id} - GearGuild`,
        description: `Discover premium tech products at GearGuild - Product ID: ${id}`,
    }
}