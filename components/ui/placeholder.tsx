export function TextPlaceholder({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`bg-gray-200 rounded h-4 mb-2 ${i === lines - 1 ? "w-3/4" : "w-full"}`} />
      ))}
    </div>
  )
}

export function ImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-gray-200 animate-pulse rounded flex items-center justify-center ${className}`}>
      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}

export function CardPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 animate-pulse ${className}`}>
      <ImagePlaceholder className="w-full h-48 mb-4" />
      <TextPlaceholder lines={2} className="mb-2" />
      <div className="bg-gray-200 rounded h-6 w-1/3"></div>
    </div>
  )
}

export function ProductPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse ${className}`}>
      <ImagePlaceholder className="w-full h-48" />
      <div className="p-4">
        <div className="bg-gray-200 rounded h-4 w-1/2 mb-2"></div>
        <div className="bg-gray-200 rounded h-5 w-3/4 mb-3"></div>
        <div className="bg-gray-200 rounded h-6 w-1/3 mb-3"></div>
        <div className="bg-gray-200 rounded h-10 w-full"></div>
      </div>
    </div>
  )
}
