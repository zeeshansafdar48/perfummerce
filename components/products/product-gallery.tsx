// Third-party imports
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Component imports
import { Button } from '@/components/ui/button'

// Types
interface ProductGalleryProps {
  images: { url: string }[]
  productName: string
}

/**
 * ProductGallery displays a carousel/gallery of product images with navigation and thumbnails.
 * @param {Object} props
 * @param {{ url: string }[]} props.images - Array of image objects
 * @param {string} props.productName - Name of the product for alt text
 */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  // State
  const [currentIndex, setCurrentIndex] = useState(0)

  // Functions
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Fallback for no images
  const galleryImages = images.length === 0 ? [{ url: '/placeholder-perfume.jpg' }] : images

  // Render
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={galleryImages[currentIndex]?.url}
          alt={`${productName} - Image ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority
        />

        {galleryImages.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {galleryImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${index === currentIndex ? 'border-rose-500' : 'border-gray-200'}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Select image ${index + 1}`}
              aria-current={index === currentIndex}
            >
              <Image
                src={image?.url}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}