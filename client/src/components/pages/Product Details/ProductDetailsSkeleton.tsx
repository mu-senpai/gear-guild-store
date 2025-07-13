export function ProductDetailsSkeleton() {
    return (
        <div className="w-11/12 2xl:w-[88%] max-w-[105.6rem] mx-auto pt-24 md:pt-28 lg:pt-32">
            {/* Breadcrumb Skeleton */}
            <div className="mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="w-16 h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="w-16 h-4 bg-slate-200 rounded animate-pulse"></div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-12">

                {/* Image Skeleton */}
                <div className="aspect-square bg-slate-200 rounded-2xl animate-pulse"></div>

                {/* Content Skeleton */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="w-20 h-6 bg-slate-200 rounded animate-pulse"></div>
                        <div className="w-full h-8 bg-slate-200 rounded animate-pulse"></div>
                        <div className="w-3/4 h-6 bg-slate-200 rounded animate-pulse"></div>
                    </div>

                    <div className="space-y-2">
                        <div className="w-32 h-8 bg-slate-200 rounded animate-pulse"></div>
                        <div className="w-24 h-6 bg-slate-200 rounded animate-pulse"></div>
                    </div>

                    <div className="space-y-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="w-full h-12 bg-slate-200 rounded animate-pulse"></div>
                        <div className="w-full h-12 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}