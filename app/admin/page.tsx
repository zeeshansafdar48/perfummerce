import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import {
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import Order from '@/models/Order'
import Product from '@/models/Product'
// import dbConnect from '@/lib/mongodb' // Commented out for dummy data

export default async function AdminDashboard() {
  // Dummy data for demo/testing only
  const user = { name: 'Admin', role: 'ADMIN' };
  const stats = [
    { title: 'Total Orders', value: 12, icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Products', value: 3, icon: Package, color: 'bg-green-100 text-green-600' },
    { title: 'Total Revenue', value: '$335.00', icon: DollarSign, color: 'bg-purple-100 text-purple-600' },
    { title: 'Pending Orders', value: 2, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
  ];
  const recentOrders = [
    { id: 'order1', orderNumber: '1001', customerName: 'Sarah Johnson', createdAt: new Date(), total: 120, status: 'DELIVERED' },
    { id: 'order2', orderNumber: '1002', customerName: 'Michael Chen', createdAt: new Date(), total: 110, status: 'PENDING' },
  ];
  const lowStockProducts = [
    { id: 'prod3', name: 'Gucci Bloom', brand: { name: 'Gucci' }, stock: 5 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">#{order.orderNumber}</p>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${order.total.toFixed(2)}</p>
                    <Badge
                      variant={
                        order.status === 'DELIVERED' ? 'default' :
                          order.status === 'PENDING' ? 'secondary' :
                            'outline'
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  All products are well stocked!
                </p>
              ) : (
                lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.brand.name}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive">
                        {product.stock} left
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}