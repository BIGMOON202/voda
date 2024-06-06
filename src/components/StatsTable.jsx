import React from "react";

export const StatsTable = ({ subDocs }) => {
  return (
    <div className="p-5">
      <table className="min-w-full table-auto text-sm text-left text-gray-500 border-collapse">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th rowSpan="2" className="px-1 py-2 border-r border-b text-center">
              Number
            </th>
            <th rowSpan="2" className="px-1 py-2 border-r border-b text-center">
              Name
            </th>
            <th rowSpan="2" className="px-1 py-2 border-r border-b text-center">
              Points
            </th>
            <th colSpan="3" className="px-1 py-2 text-center border-r border-b">
              Serve
            </th>
            <th colSpan="2" className="px-1 py-2 text-center border-r border-b">
              Reception
            </th>
            <th colSpan="3" className="px-1 py-2 text-center border-r border-b">
              Attacks
            </th>
            <th className="px-1 py-2 text-center border-r border-b">Block</th>
            <th colSpan="2" className="px-1 py-2 text-center border-r border-b">
              Other
            </th>
          </tr>
          <tr>
            <th className="px-1 py-2 border-r border-b text-center">Ace</th>
            <th className="px-1 py-2 border-r border-b text-center">Errors</th>
            <th className="px-1 py-2 border-r border-b text-center">TA</th>
            <th className="px-1 py-2 border-r border-b text-center">Errors</th>
            <th className="px-1 py-2 border-r border-b text-center">TA</th>
            <th className="px-1 py-2 border-r border-b text-center">Kill</th>
            <th className="px-1 py-2 border-r border-b text-center">Errors</th>
            <th className="px-1 py-2 border-r border-b text-center">TA</th>
            <th className="px-1 py-2 border-r border-b text-center">Points</th>
            <th className="px-1 py-2 border-r border-b text-center">Digs</th>
            <th className="px-1 py-2 border-r border-b text-center">Assists</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {subDocs.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-1 py-2 border-r text-center">{row.Number}</td>
              <td className="px-1 py-2 border-r text-center">{row.Name}</td>
              <td className="px-1 py-2 border-r text-center">{row.Points}</td>
              <td className="px-1 py-2 border-r text-center">
                {row.Serve_Ace}
              </td>
              <td className="px-1 py-2 border-r text-center">
                {row.Serve_Errors}
              </td>
              <td className="px-1 py-2 border-r text-center">{row.Serve_TA}</td>
              <td className="px-1 py-2 border-r text-center">
                {row.Reception_Errors}
              </td>
              <td className="px-1 py-2 border-r text-center">
                {row.Reception_TA}
              </td>
              <td className="px-1 py-2 border-r text-center">
                {row.Attacks_Kill}
              </td>
              <td className="px-1 py-2 border-r text-center">
                {row.Attacks_Errors}
              </td>
              <td className="px-1 py-2 border-r text-center">
                {row.Attacks_TA}
              </td>
              <td className="px-1 py-2 border-r text-center">
                {row.Block_Points}
              </td>
              <td className="px-1 py-2 border-r text-center">
                {row.Other_Digs}
              </td>
              <td className="px-1 py-2 text-center">{row.Other_Assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
