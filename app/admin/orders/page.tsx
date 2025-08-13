import DataTable from "@/components/admin/DataTable";
import AdminBackButton from "@/components/admin/AdminBackButton";
import { getAllOrders } from "@/lib/supabase/orders";

const statusOptions = ["pending", "confirmed", "cancelled", "completed"];

function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default async function AdminOrdersPage({ searchParams }: { searchParams?: Record<string, string> }) {
  searchParams = await searchParams || {};
  const page = Number(searchParams?.page ?? "1") || 1;
  const pageSize = 10;
  const customerId = searchParams?.customerId ?? "";
  const status = searchParams?.status ?? "";
  const startDate = searchParams?.startDate ?? "";
  const endDate = searchParams?.endDate ?? "";

  let allOrders = [];
  try {
    allOrders = await getAllOrders();
    console.log("🚀 ~ AdminOrdersPage ~ allOrders:", allOrders)
  } catch (err: any) {
    return <div className="text-center py-8 text-red-600">{err.message || "Failed to fetch orders"}</div>;
  }

  // Filter logic
  let filteredOrders = Array.isArray(allOrders) ? allOrders : [];
  if (customerId) {
    filteredOrders = filteredOrders.filter((o) => String(o.customerId || o.user_id).includes(customerId));
  }
  if (status) {
    filteredOrders = filteredOrders.filter((o) => o.status === status);
  }
  if (startDate) {
    filteredOrders = filteredOrders.filter((o) => o.created_at >= startDate);
  }
  if (endDate) {
    filteredOrders = filteredOrders.filter((o) => o.created_at <= endDate);
  }

  // Pagination logic
  const total = filteredOrders.length;
  const paginatedOrders = filteredOrders.slice((page - 1) * pageSize, page * pageSize);

  function getPageUrl(newPage: number) {
    const params = new URLSearchParams({ ...searchParams, page: String(newPage) });
    return `/admin/orders?${params.toString()}`;
  }

  return (
    <div className="p-8">
      <AdminBackButton />
      <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
      <form className="mb-4 flex gap-4 items-center" method="get">
        <input type="text" name="customerId" defaultValue={customerId} placeholder="Customer ID" className="border rounded px-2 py-1" />
        <select name="status" defaultValue={status} className="border rounded px-2 py-1">
          <option value="">All Statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input type="date" name="startDate" defaultValue={startDate} className="border rounded px-2 py-1" />
        <input type="date" name="endDate" defaultValue={endDate} className="border rounded px-2 py-1" />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded shadow">Filter</button>
      </form>
      <DataTable
        columns={[
          { key: "order_number", label: "Order ID" },
          { key: "user_id", label: "Customer" },
          { key: "status", label: "Status" },
          { key: "total_amount", label: "Amount" },
          { key: "payment_method", label: "Payment Method" },
          { key: "shipping_address", label: "Shipping Address" },
          { key: "placed_at", label: "Created" },
        ]}
        data={paginatedOrders}
        renderCell={(row, key) =>
          key === "created_at"
            ? formatDate(row[key])
            : row[key]
        }
        pagination={undefined}
      />
      <div className="flex justify-end items-center mt-4 gap-2">
        {page > 1 && (
          <a href={getPageUrl(page - 1)} className="px-2 py-1 border rounded">Prev</a>
        )}
        <span>Page {page} of {Math.max(1, Math.ceil(total / pageSize))}</span>
        {page * pageSize < total && (
          <a href={getPageUrl(page + 1)} className="px-2 py-1 border rounded">Next</a>
        )}
      </div>
    </div>
  );
}
