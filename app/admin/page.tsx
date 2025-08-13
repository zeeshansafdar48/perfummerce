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

export default async function AdminDashboard() {
  // Statistics (replace with API calls)
  const stats = [
    { title: "Total Orders", value: 120 },
    { title: "Total Revenue", value: "$12,000" },
    { title: "Total Users", value: 350 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <div>
              <div className="text-sm text-gray-500">{stat.title}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <a href="/admin/orders" className="px-4 py-2 bg-blue-600 text-white rounded shadow">Manage Orders</a>
        <a href="/admin/users" className="px-4 py-2 bg-green-600 text-white rounded shadow">Manage Users</a>
      </div>
    </div>
  );
}