import React from "react";

export const StatsTableBasketball = ({ subDocs }) => {
  return (
    <div className="p-5">
      <table className="min-w-full table-auto text-sm text-left text-gray-500 border-collapse">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-1 py-2 border-r border-b text-center">Number</th>
            <th className="px-1 py-2 border-r border-b text-center">Name</th>
            <th className="px-1 py-2 border-r border-b text-center">MIN</th>
            <th className="px-1 py-2 text-center border-r border-b">FG%</th>
            <th className="px-1 py-2 text-center border-r border-b">3P%</th>
            <th className="px-1 py-2 text-center border-r border-b">FT%</th>
            <th className="px-1 py-2 text-center border-r border-b">REB</th>
            <th className="px-1 py-2 text-center border-r border-b">AST</th>
            <th className="px-1 py-2 text-center border-r border-b">BLK</th>
            <th className="px-1 py-2 text-center border-r border-b">STL</th>
            <th className="px-1 py-2 text-center border-r border-b">TO</th>
            <th className="px-1 py-2 text-center border-r border-b">PTS</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {subDocs.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-1 py-2 border-r text-center">{row.Number}</td>
              <td className="px-1 py-2 border-r text-center">{row.Name}</td>
              <td className="px-1 py-2 border-r text-center">{row.Min}</td>
              <td className="px-1 py-2 border-r text-center">{row.fg}</td>
              <td className="px-1 py-2 border-r text-center">{row.threeP}</td>
              <td className="px-1 py-2 border-r text-center">{row.ft}</td>
              <td className="px-1 py-2 border-r text-center">{row.Reb}</td>
              <td className="px-1 py-2 border-r text-center">{row.Ast}</td>
              <td className="px-1 py-2 border-r text-center">{row.blk}</td>
              <td className="px-1 py-2 border-r text-center">{row.stl}</td>
              <td className="px-1 py-2 border-r text-center">{row.TO}</td>
              <td className="px-1 py-2 border-r text-center">{row.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
