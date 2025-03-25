"use client"

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Toggle({ checked, onChange, label, disabled = false, size = "md", className = "" }: ToggleProps) {
  const sizeClasses = {
    sm: {
      toggle: "h-4 w-8",
      circle: "h-3 w-3",
      translate: "translate-x-4",
    },
    md: {
      toggle: "h-5 w-10",
      circle: "h-4 w-4",
      translate: "translate-x-5",
    },
    lg: {
      toggle: "h-6 w-12",
      circle: "h-5 w-5",
      translate: "translate-x-6",
    },
  }

  return (
    <label
      className={`flex items-center ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={() => onChange(!checked)}
          disabled={disabled}
        />

        <div
          className={`${sizeClasses[size].toggle} ${
            checked ? "bg-[#00998F]" : "bg-gray-300"
          } rounded-full transition-colors`}
        ></div>

        <div
          className={`absolute top-0.5 right-0.5 bg-white rounded-full transition-transform ${
            sizeClasses[size].circle
          } ${checked ? `transform ${sizeClasses[size].translate}` : ""}`}
        ></div>
      </div>

      {label && <span className="mr-3 text-sm">{label}</span>}
    </label>
  )
}

