
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 backdrop-blur-sm [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-black/80 text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.03] hover:bg-black/90 border border-white/10",
        destructive:
          "bg-destructive/90 text-destructive-foreground shadow-sm hover:bg-destructive hover:shadow-md hover:scale-[1.02] border border-white/10",
        outline:
          "border-2 border-input/80 bg-background/40 hover:bg-accent/30 hover:text-accent-foreground hover:border-accent/80 hover:scale-[1.02] shadow-sm hover:shadow backdrop-blur-md",
        secondary:
          "bg-secondary/80 text-secondary-foreground shadow-sm hover:bg-secondary/90 hover:shadow-md hover:scale-[1.02] border border-white/10 backdrop-blur-md",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-foreground shadow-sm hover:bg-white/20 hover:border-white/30 hover:shadow-md hover:scale-[1.02]",
        premium: "bg-gradient-to-r from-gray-900/90 to-gray-700/90 backdrop-blur-md text-white border border-white/10 shadow-md hover:shadow-lg hover:scale-[1.03] hover:from-gray-800/90 hover:to-black/90",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-md px-4 py-2 text-xs",
        lg: "h-12 rounded-md px-8 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
