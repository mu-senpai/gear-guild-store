"use server";

// Function to fetch product data (server-side)
export default async function fetchProduct(id: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`, {
            cache: 'force-cache', 
        })

        if (!response.ok) {
            throw new Error('Product not found')
        }

        const data = await response.json()
        return data.data // Assuming your API returns { success: true, data: product }
    } catch (error) {
        console.error('Error fetching product:', error)
        return null
    }
}