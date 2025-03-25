import Image from 'next/image'

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Avatar({ 
  src, 
  alt = 'Avatar', 
  fallback,
  size = 'md',
  className = ''
}: AvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg'
  }
  
  if (!src && !fallback) {
    fallback = alt.charAt(0).toUpperCase()
  }
  
  return (
    <div 
      className={`relative rounded-full overflow-hidden flex items-center justify-center ${
        sizeClasses[size]
      } ${className}`}
    >
      {src ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
        />
      ) : (
        <div className="bg-[#00998F] text-white w-full h-full flex items-center justify-center font-medium">
          {fallback}
        </div>
      )}
    </div>
  )
}
