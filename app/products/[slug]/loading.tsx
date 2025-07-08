import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingProductDetailPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Skeleton */}
        <div className="flex items-center justify-center">
          <Skeleton className="w-full aspect-square max-w-xl h-[700px]" />
        </div>
        {/* Product Info Skeleton */}
        <div className="space-y-6 w-full">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-10 w-1/2 mb-2" />
          <Skeleton className="h-8 w-1/3 mb-2" />
          <Skeleton className="h-8 w-1/4 mb-2" />
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-8 w-1/2 mb-4" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40 rounded" />
            <Skeleton className="h-12 w-40 rounded" />
          </div>
          <Skeleton className="h-6 w-1/3 mt-6" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      {/* Related Products Skeleton */}
      <div className="mt-12">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="group overflow-hidden rounded-lg border bg-white">
              <div className="relative aspect-square overflow-hidden">
                <Skeleton className="absolute inset-0 w-full h-full" />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex items-center justify-between mt-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
