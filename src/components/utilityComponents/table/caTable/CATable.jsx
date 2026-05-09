"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export function CATable({ columns, data, getRowClassName }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="ca-table w-full max-w-full overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-4">
        <thead className="text-[#6b7280] text-sm font-normal">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-4">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="text-md">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={getRowClassName?.(row) ?? ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-400 text-lg h-50"
              >
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
