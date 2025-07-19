'use client'
// Third-party imports
import { ShoppingCart } from 'lucide-react'

// Component imports
import { Button } from '@/components/ui/button'

// Helper imports
import { useCartStore } from '@/lib/store'
import { toast } from 'sonner'

// Types
interface ProductCardProps {
  product: any
}

/**
 * ProductCard displays a product with image, price, and add-to-cart button.
 * @param {Object} props
 * @param {any} props.product - Product object
 */
export function AddToCartButton({ product }: ProductCardProps) {
  // Custom hooks
  const addItem = useCartStore((state) => state.addItem)

  // Functions
  const handleAddToCart = () => {
    addItem(product)
    toast.success('Added to cart!', {
      description: `${product?.name} has been added to your cart.`
    })
  }

  // Render
  return (
    <Button
      size="sm"
      onClick={handleAddToCart}
      className="bg-white text-gray-900 hover:bg-gray-100"
      aria-label={`Add ${product?.name} to cart`}
    >
      <ShoppingCart className="h-4 w-4" />
    </Button>
  )
}