import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingCartPage() {
  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-2 lg:px-2 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        <Skeleton className="h-10 w-64" />
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-white">
              <div className="flex items-center space-x-4 p-6">
                <Skeleton className="w-20 h-20 rounded-lg" />
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-10 w-10 rounded" />
                  <Skeleton className="h-6 w-8" />
                  <Skeleton className="h-10 w-10 rounded" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-8 w-8 mt-2 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Order Summary Skeleton */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-white p-6 space-y-4">
            <Skeleton className="h-8 w-40 mb-4" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="border-t my-2" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
            <Skeleton className="h-12 w-full mt-6 rounded" />
            <Skeleton className="h-12 w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
