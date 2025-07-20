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
    return {
        title: `Product ${id} - GearGuild`,
        description: `Discover premium tech products at GearGuild - Product ID: ${id}`,
    }
}