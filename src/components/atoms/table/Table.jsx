import React from 'react';

export const Table = ({ headers, data }) => {

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="border-2 border-slate-300 text-green-900 bg-[#20c194]">
          {headers.map((header, index) => (
            <th key={index} className="py-2 font-medium text-lg pl-5">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data && Array.isArray(data) && data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border border-slate-300">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2 pl-5">
                  {cell}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr colSpan={headers.length} className="py-2 pl-5">
            <td>Nenhum dado diponível</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
