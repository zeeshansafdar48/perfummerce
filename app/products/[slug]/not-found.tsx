import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Frown } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardContent className="py-12">
          <div className="flex flex-col items-center mb-6">
            <Frown className="h-16 w-16 text-rose-600 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Product Not Found</h2>
            <p className="text-gray-500 mb-6">
              Sorry, the product you are looking for does not exist.
            </p>
            <Button asChild className="bg-rose-600 hover:bg-rose-700">
              <Link href="/products">Go to Products</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
