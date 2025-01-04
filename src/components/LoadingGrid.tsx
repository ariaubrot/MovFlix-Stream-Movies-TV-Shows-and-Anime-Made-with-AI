export function LoadingGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white/5 aspect-[2/3] rounded-lg"></div>
            <div className="mt-2 space-y-2">
              <div className="h-4 bg-white/5 rounded w-2/3"></div>
              <div className="h-4 bg-white/5 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}