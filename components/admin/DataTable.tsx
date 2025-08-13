import React from "react";

interface DataTableProps<T> {
  columns: { key: keyof T; label: string }[];
  data: T[];
  renderCell?: (row: T, key: keyof T) => React.ReactNode;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

function DataTable<T>({ columns, data, renderCell, pagination }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-2">
                  {renderCell ? renderCell(row, col.key) : (row[col.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="flex justify-end items-center mt-2 gap-2">
          <button
            className="px-2 py-1 border rounded"
            disabled={pagination.page === 1}
            onClick={() => pagination.onPageChange(pagination.page - 1)}
          >
            Prev
          </button>
          <span>Page {pagination.page} of {Math.ceil(pagination.total / pagination.pageSize)}</span>
          <button
            className="px-2 py-1 border rounded"
            disabled={pagination.page * pagination.pageSize >= pagination.total}
            onClick={() => pagination.onPageChange(pagination.page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;
