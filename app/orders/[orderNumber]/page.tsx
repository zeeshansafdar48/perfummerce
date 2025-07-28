import { notFound } from 'next/navigation'
import { getOrderByNumber } from '@/lib/supabase/orders'
import { formatCurrency } from '@/lib/currency'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export default async function OrderDetailPage({ params }: { params: { orderNumber: string } }) {
  params = await params; // Ensure params is awaited if it's a Promise
  if (!params || !params.orderNumber) {
    return notFound();
  }
  const order = await getOrderByNumber(params.orderNumber)
  console.log("==> ~ OrderDetailPage ~ order:", order)
  if (!order) return notFound()

  const { email, full_name, phone } = order.user_profiles || {};

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Order #{order.order_number}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Order Details</h2>
            <div className="space-y-2">
              <div><span className="font-medium">Customer:</span> {full_name}</div>
              <div><span className="font-medium">Email:</span> {email}</div>
              <div><span className="font-medium">Phone:</span> {phone}</div>
              <div><span className="font-medium">Shipping Address:</span> {order.shipping_address}</div>
              <div><span className="font-medium">Payment Method:</span> {order.payment_method}</div>
              <div><span className="font-medium">Status:</span> <Badge>{order.status}</Badge></div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Items</h2>
            <div className="space-y-3">
              {order?.order_items?.map((item: any) => (
                <div key={item.product_id} className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image src={item.imageUrl || '/placeholder-perfume.jpg'} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.brand}</p>
                  </div>
                  <Badge variant="secondary">{item.quantity}x</Badge>
                  <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold text-lg">{formatCurrency(order.total_amount)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
