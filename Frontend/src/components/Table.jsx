import React from "react";

const Table = ({ columns, data, renderActions }) => {
  return (
      <div className="overflow-x-auto overflow-y-hidden h-full">
      <table className="table-auto table-fixed w-full bg-gray-800 text-gray-200 rounded-lg shadow-lg leading-none">
        <thead>
          <tr className="bg-blue-900 text-gray-100">
            <th className="px-4 py-3 text-left text-sm">S. No.</th>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left text-sm">
                {col.title}
              </th>
            ))}
            {renderActions && (
              <th className="px-4 py-3 text-center text-sm">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={`${
                index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
              } hover:bg-gray-600`}
            >
              <td className="px-4 py-3 text-sm border-t border-gray-600">
                {index + 1} {/* Sequential numbering */}
              </td>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 text-sm text-gray-300 border-t border-gray-600"
                >
                  {item[col.key]}
                </td>
              ))}
              {renderActions && (
                <td className="px-4 py-3 text-center border-t border-gray-600">
                  {renderActions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
