"use client"

// Third-party imports
import { useState } from 'react'
import { Star, ThumbsUp } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

// Component imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// Types
interface ProductReviewsProps {
  product: any
}

/**
 * ProductReviews displays customer reviews, rating summary, and review breakdown for a product.
 * @param {Object} props
 * @param {any} props.product - Product object with reviews
 */
export function ProductReviews({ product }: ProductReviewsProps) {
  // State
  const [showAllReviews, setShowAllReviews] = useState(false)

  // Derived values
  type Review = { rating: number; user: { name: string }; id: string; comment: string; createdAt: string }
  const averageRating = product?.reviews?.length > 0
    ? (product.reviews as Review[]).reduce((sum: number, review: Review) => sum + review.rating, 0) / product?.reviews?.length
    : 0
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: (product?.reviews as Review[])?.filter((review: Review) => review.rating === rating).length,
    percentage: product?.reviews?.length > 0
      ? ((product?.reviews as Review[]).filter((review: Review) => review.rating === rating).length / product?.reviews?.length) * 100
      : 0
  }))
  const displayedReviews = showAllReviews ? (product?.reviews as Review[]) : (product?.reviews as Review[])?.slice(0, 3)

  // Render
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rating Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2" aria-label="Average rating">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    aria-hidden={i >= Math.floor(averageRating)}
                  />
                ))}
              </div>
              <p className="text-gray-600">
                Based on {product?.reviews?.length} reviews
              </p>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-12">{rating} stars</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                      aria-label={`${percentage.toFixed(0)}% of reviews are ${rating} stars`}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Individual Reviews */}
          <div className="space-y-6">
            {displayedReviews.map((review: Review) => (
              <div key={review.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                      <span className="text-rose-600 font-medium">
                        {review?.user?.name && review?.user?.name[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{review?.user?.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="flex" aria-label={`Rating: ${review.rating} out of 5`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        aria-hidden={i >= review.rating}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700">{review.comment}</p>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-600" aria-label="Mark review as helpful">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful
                  </Button>
                </div>

                <Separator />
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {product.reviews.length > 3 && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setShowAllReviews(!showAllReviews)}
                aria-label={showAllReviews ? 'Show less reviews' : 'Show all reviews'}
              >
                {showAllReviews ? 'Show Less' : `Show All ${product.reviews.length} Reviews`}
              </Button>
            </div>
          )}

          {/* No Reviews Message */}
          {product.reviews.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No reviews yet.</p>
              <p className="text-sm text-gray-400 mt-1">
                Be the first to review this product!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}