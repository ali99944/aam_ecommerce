export function TextLoader({ width = 'w-24', className = '' }: { width?: string, className?: string }) {
    return (
      <div className={`h-4 bg-[#D3EBE8] rounded animate-pulse ${width} ${className}`}></div>
    )
  }
  
  export function CardLoader({ className = '' }: { className?: string }) {
    return (
      <div className={`rounded-sm overflow-hidden animate-pulse ${className}`}>
        <div className="h-48 bg-[#D3EBE8]"></div>
        <div className="pt-4 space-y-3">
          <div className="h-4 bg-[#D3EBE8] rounded-sm w-3/4"></div>
          <div className="h-4 bg-[#D3EBE8] rounded-sm w-1/2"></div>
          <div className="flex justify-between items-center pt-2">
            <div className="h-8 w-8 bg-[#D3EBE8] rounded-sm"></div>
            <div className="h-4 bg-[#D3EBE8] rounded-sm w-1/4"></div>
          </div>
        </div>
      </div>
    )
  }
  
  export function GridLoader({ count = 4, className = '' }: { count?: number, className?: string }) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {Array.from({ length: count }).map((_, index) => (
          <CardLoader key={index} />
        ))}
      </div>
    )
  }
  
  export function LinesLoader({ lines = 3, className = '' }: { lines?: number, className?: string }) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div 
            key={index} 
            className={`h-4 bg-[#D3EBE8] rounded animate-pulse ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
          ></div>
        ))}
      </div>
    )
  }
  
  export function PageOverlayLoader() {
    return (
      <div className="fixed inset-0 bg-[#D3EBE8]/80 z-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative h-12 w-12 mb-4">
            <div className="absolute top-0 left-0 h-full w-full border-4 border-[#D2EAE8] rounded-full"></div>
            <div className="absolute top-0 left-0 h-full w-full border-4 border-t-[#00998F] rounded-full animate-spin"></div>
          </div>
          <p className="text-[#00998F] font-medium">جاري التحميل...</p>
        </div>
      </div>
    )
  }
  