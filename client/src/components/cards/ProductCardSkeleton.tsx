export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden h-[420px] flex flex-col">
      {/* Header Skeleton */}
      <div className="p-4 flex justify-between items-start">
        <div className="w-16 h-6 bg-slate-200 rounded-full animate-pulse"></div>
        <div className="w-20 h-6 bg-slate-200 rounded-full animate-pulse"></div>
      </div>

      {/* Image Skeleton */}
      <div className="h-48 bg-slate-100 animate-pulse"></div>

      {/* Content Skeleton */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        {/* Title Skeleton */}
        <div className="mb-4 space-y-2">
          <div className="w-full h-5 bg-slate-200 rounded animate-pulse"></div>
          <div className="w-3/4 h-5 bg-slate-200 rounded animate-pulse"></div>
        </div>

        {/* Price Skeleton */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-16 h-4 bg-slate-200 rounded animate-pulse"></div>
            <div className="w-20 h-6 bg-slate-200 rounded animate-pulse"></div>
          </div>
          <div className="w-24 h-4 bg-slate-200 rounded animate-pulse"></div>
        </div>

        {/* Button Skeleton */}
        <div className="w-full h-12 bg-slate-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  )
}