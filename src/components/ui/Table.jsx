import React from 'react';

export const Table = ({ children }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">{children}</table>
    </div>
);

export const TableHead = ({ children }) => (
    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
    {children}
    </thead>
);

export const TableBody = ({ children }) => (
    <tbody className="divide-y divide-gray-100">
    {children}
    </tbody>
);

export const TableRow = ({ children, className = '' }) => (
    <tr className={`bg-white hover:bg-gray-50 transition-colors ${className}`}>
        {children}
    </tr>
);

export const TableHeader = ({ children }) => (
    <th className="px-6 py-3 font-medium text-gray-700 whitespace-nowrap">
        {children}
    </th>
);

export const TableCell = ({ children, className = '' }) => (
    <td className={`px-6 py-4 text-gray-600 ${className}`}>
        {children}
    </td>
);