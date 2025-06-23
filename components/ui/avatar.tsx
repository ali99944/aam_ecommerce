import { cn } from "@/lib/utils"

interface AvatarProps {
  src?: string
  alt?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
  onClick?: () => void
  fallback?: string
}

const sizeClasses = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
  xl: "w-20 h-20 text-xl",
}

export default function Avatar({ 
  src, 
  alt = "Avatar", 
  size = "md", 
  className, 
  onClick,
  fallback 
}: AvatarProps) {
  const initials = fallback || alt?.split(' ').map(n => n[0]).join('').toUpperCase() || "U"

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-gray-100 overflow-hidden",
        sizeClasses[size],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {src ? (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.innerHTML = `<span class="font-medium text-gray-600">${initials}</span>`
            }
          }}
        />
      ) : (
        <span className="font-medium text-gray-600">{initials}</span>
      )}
    </div>
  )
}
