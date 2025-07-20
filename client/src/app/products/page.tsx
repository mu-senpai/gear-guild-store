import { PageBanner } from '@/components/shared/PageBanner/PageBanner'
import { ProductsListing } from '@/components/pages/All Products/ProductsListing'

export default function AllProductsPage() {
    return (
        <main>
            <PageBanner title="All Products" />
            <ProductsListing />
        </main>
    )
}

export const metadata = {
    title: 'All Products - GearGuild',
    description: 'Browse our complete collection of premium electronics, mobiles, laptops, and accessories at GearGuild.',
}