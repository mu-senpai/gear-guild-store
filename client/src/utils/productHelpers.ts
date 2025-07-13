export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}

export const parseDescription = (description: string): { specifications: string[], features: string[] } => {
  const parts = description.split(' | ')
  const specifications = parts[0]?.replace('Specifications: ', '').split(', ') || []
  const features = parts[1]?.replace('Features: ', '').split(', ') || []
  
  return { specifications, features }
}