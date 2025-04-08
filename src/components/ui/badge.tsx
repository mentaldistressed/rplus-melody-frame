
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-md",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/80 text-primary-foreground shadow hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary/80 text-secondary-foreground shadow hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive/80 text-destructive-foreground shadow hover:bg-destructive/90",
        outline: "text-foreground shadow-sm border-gray-300/80 hover:border-gray-400/80 hover:bg-gray-50/30",
        gradient: "border-transparent bg-gradient-to-r from-black/90 to-gray-700/90 text-primary-foreground shadow backdrop-blur-md",
        glass: "border-white/20 bg-white/10 text-foreground shadow-sm hover:bg-white/20 hover:border-white/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
