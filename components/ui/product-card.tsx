'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Heart } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { toast } from 'sonner'

interface ProductCardProps {
  product: any
  brandName?: string
  categoryName?: string
}

export function ProductCard({ product, brandName, categoryName }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(product)
    toast.success('Added to cart!', {
      description: `${product?.name} has been added to your cart.`
    })
  }

  const discountPercentage = product?.comparePrice
    ? Math.round(((product?.comparePrice - product?.price) / product?.comparePrice) * 100)
    : 0

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product?.images?.[0]?.url || '/placeholder-perfume.jpg'}
          alt={product?.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product?.featured && (
          <Badge className="absolute top-2 left-2 bg-rose-600 hover:bg-rose-700">
            Featured
          </Badge>
        )}
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
            -{discountPercentage}%
          </Badge>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {brandName}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {product?.gender}
            </Badge>
          </div>

          <Link href={`/products/${product?.slug}`}>
            <h3 className="font-semibold text-gray-900 hover:text-rose-600 transition-colors cursor-pointer line-clamp-1">
              {product?.name}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 line-clamp-2">
            {product?.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ${product?.price.toFixed(2)}
              </span>
              {product?.comparePrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product?.comparePrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="text-sm text-gray-500">
              {product?.stock > 0 ? (
                <span className="text-green-600">In Stock ({product?.stock})</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}