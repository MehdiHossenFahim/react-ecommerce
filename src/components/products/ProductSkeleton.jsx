import React from 'react';

export const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between animate-pulse">
      <div>
        {/* Image skeleton */}
        <div className="w-full h-52 bg-slate-200 rounded-xl mb-4"></div>

        {/* Category badge skeleton */}
        <div className="w-20 h-5 bg-slate-200 rounded-full mb-3"></div>

        {/* Title skeleton */}
        <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
        <div className="w-3/4 h-4 bg-slate-200 rounded mb-4"></div>

        {/* Rating skeleton */}
        <div className="w-24 h-4 bg-slate-200 rounded mb-4"></div>
      </div>

      {/* Price and Button skeleton */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="w-20 h-6 bg-slate-200 rounded"></div>
        <div className="w-28 h-9 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </div>
  );
};

export default ProductSkeleton;
