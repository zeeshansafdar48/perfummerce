import DataTable from "@/components/admin/DataTable";
import AdminBackButton from "@/components/admin/AdminBackButton";
import { User } from "@/types/user";
import { getAllUsers } from "@/lib/supabase/users";

export default async function AdminUsersPage({ searchParams }: { searchParams?: Record<string, string> }) {
  searchParams = await searchParams || {};
  const page = Number(searchParams?.page ?? "1") || 1;
  const pageSize = 10;
  const search = searchParams?.search ?? "";

  let allUsers: User[] = [];
  try {
    allUsers = await getAllUsers();
  } catch (err: any) {
    return <div className="text-center py-8 text-red-600">{err.message || "Failed to fetch users"}</div>;
  }

  // Filter logic
  let filteredUsers = Array.isArray(allUsers) ? allUsers : [];
  if (search) {
    filteredUsers = filteredUsers.filter(
      (u) =>
        (u.full_name?.toLowerCase().includes(search.toLowerCase()) || "") ||
        (u.email?.toLowerCase().includes(search.toLowerCase()) || "") ||
        (u.phone?.toLowerCase().includes(search.toLowerCase()) || "")
    );
  }

  // Pagination logic
  const total = filteredUsers.length;
  const paginatedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);

  // Pagination navigation (server component: use links)
  function getPageUrl(newPage: number) {
    const params = new URLSearchParams({ ...searchParams, page: String(newPage) });
    return `/admin/users?${params.toString()}`;
  }

  return (
    <div className="p-8">
      <AdminBackButton />
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>
      <form className="mb-4 flex gap-4 items-center" method="get">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Name/Email/Phone"
          className="border rounded px-2 py-1"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded shadow">Filter</button>
      </form>
      <DataTable
        columns={[
          { key: "full_name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "created_at", label: "Registered" },
        ]}
        data={paginatedUsers}
        renderCell={(row, key) => row[key]}
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
