interface AuthFormSkeletonProps {
  fields?: number;
}

export const AuthFormSkeleton = ({ fields = 2 }: AuthFormSkeletonProps) => (
  <div className="w-full animate-pulse">
    {/* Title + subtitle — mirrors the heading every auth screen renders above its form */}
    <div className="h-9 w-48 bg-gray-200 rounded mb-6" />
    <div className="h-5 w-64 bg-gray-200 rounded mb-10" />

    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded-lg" />
        </div>
      ))}
      <div className="h-12 w-full bg-gray-200 rounded-xl" />
    </div>
  </div>
);
