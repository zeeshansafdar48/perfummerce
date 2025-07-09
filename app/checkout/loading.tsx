import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingCheckoutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        <Skeleton className="h-10 w-64" />
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form Skeleton */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-white">
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
          <div className="rounded-lg border bg-white">
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-12 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
          <div className="rounded-lg border bg-white">
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
        {/* Order Summary Skeleton */}
        <div>
          <div className="rounded-lg border bg-white p-6 space-y-4">
            <Skeleton className="h-8 w-40 mb-4" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <div className="flex-1 min-w-0 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-10" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="border-t my-2" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
            <Skeleton className="h-12 w-full mt-6 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
