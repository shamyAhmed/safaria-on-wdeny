export default function SingleBlogLoading() {
  return (
    <section className="bg-[#F7F7F7] py-8">
      <div className="container">
        {/* Breadcrumb skeleton */}
        <div className="bg-white rounded-[40px] p-4 mb-6 h-14 animate-pulse" />

        {/* Blog card skeleton */}
        <div className="bg-white rounded-[40px] p-6">
          {/* Meta row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Main image skeleton */}
          <div className="w-full h-[340px] bg-gray-200 rounded-2xl animate-pulse mb-6" />

          {/* Title skeleton */}
          <div className="h-9 w-2/3 bg-gray-200 rounded animate-pulse mb-6" />

          {/* Content lines */}
          <div className="space-y-4">
            {[100, 90, 75, 85, 60].map((w, i) => (
              <div
                key={i}
                className={`h-4 bg-gray-200 rounded animate-pulse`}
                style={{ width: `${w}%` }}
              />
            ))}
          </div>

          {/* Inner image skeleton */}
          <div className="w-full h-[300px] bg-gray-200 rounded-2xl animate-pulse my-8" />

          {/* More content lines */}
          <div className="space-y-4">
            {[80, 65].map((w, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 rounded animate-pulse"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>

        {/* Related blogs skeleton */}
        <div className="bg-white rounded-[40px] p-8 mt-10">
          <div className="h-8 w-44 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[500px] bg-gray-200 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
