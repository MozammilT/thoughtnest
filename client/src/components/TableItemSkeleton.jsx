function TableItemSkeleton() {
  return (
    <tr className={`border-y border-gray-300 animate-pulse`}>
      <th className="px-2 py-4">
        <div className="w-4 h-4 bg-gray-300 rounded mx-auto animate-pulse"></div>
      </th>
      <th className="px-2 py-4 text-left">
        <div className="w-52 max-sm:w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
      </th>
      <th className="px-2 py-4">
        <div className="inline-block bg-gray-200 rounded-full px-3 py-1.5 border my-4 animate-pulse">
          <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </th>
      <th className="px-2 py-4 max-sm:hidden text-center">
        <div className="w-32 h-4 bg-gray-200 rounded mx-auto animate-pulse"></div>
      </th>
      <th className="px-2 py-4 text-left max-sm:hidden min-w-23">
        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
      </th>
      <th className="px-2 py-4">
        <div className="flex text-xs gap-3">
          <div className="px-2 py-1 rounded min-w-20 h-6 bg-gray-300 animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </th>
    </tr>
  );
}

export default TableItemSkeleton;
