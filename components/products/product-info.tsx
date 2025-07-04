'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { toast } from 'sonner'

interface ProductInfoProps {
  product: {
    name: string
    brand: {
      name: string
    }
    category: {
      name: string
    }
    reviews: {
      rating: number
      user: {
        name: string
      }
    }[]
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    toast.success('Added to cart!', {
      description: `${quantity} x ${product?.name} added to your cart.`
    })
  }

  const averageRating = product?.reviews?.length > 0
    ? product?.reviews?.reduce((sum, review) => sum + review.rating, 0) / product?.reviews?.length
    : 0

  const discountPercentage = product?.comparePrice
    ? Math.round(((product?.comparePrice - product?.price) / product?.comparePrice) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Product Title and Brand */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{product?.brand?.name}</Badge>
          <Badge variant="outline">{product?.category?.name}</Badge>
          <Badge variant="outline">{product?.gender}</Badge>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product?.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.floor(averageRating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
                  }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {averageRating?.toFixed(1)} ({product?.reviews?.length} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-gray-900">
            ${product?.price?.toFixed(2)}
          </span>
          {product?.comparePrice && (
            <div className="flex items-center gap-2">
              <span className="text-xl text-gray-500 line-through">
                ${product?.comparePrice?.toFixed(2)}
              </span>
              <Badge className="bg-green-100 text-green-800">
                Save {discountPercentage}%
              </Badge>
            </div>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          {product?.stock ? (
            <span className="text-green-600 font-medium">
              ✓ In Stock ({product?.stock} available)
            </span>
          ) : (
            <span className="text-red-600 font-medium">
              ✗ Out of Stock
            </span>
          )}
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-700 leading-relaxed">{product?.description}</p>
      </div>

      <Separator />

      {/* Add to Cart Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label htmlFor="quantity" className="font-medium">Quantity:</label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border rounded-md px-3 py-2"
            disabled={!product?.stock}
          >
            {[...Array(Math.min(product?.stock, 10))].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleAddToCart}
            disabled={!product?.stock}
            className="flex-1 bg-rose-600 hover:bg-rose-700"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>

          <Button variant="outline" className="flex-1">
            <Heart className="h-5 w-5 mr-2" />
            Add to Wishlist
          </Button>
        </div>
      </div>

      <Separator />

      {/* Features */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Why Choose Us?</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-rose-600" />
            <span className="text-sm">Free shipping on orders over $100</span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-rose-600" />
            <span className="text-sm">100% authentic products guaranteed</span>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="h-5 w-5 text-rose-600" />
            <span className="text-sm">30-day return policy</span>
          </div>
        </div>
      </div>
    </div>
  )
}