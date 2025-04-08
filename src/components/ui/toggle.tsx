
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-300 hover:bg-muted/30 hover:backdrop-blur-md hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-gradient-to-r data-[state=on]:from-gray-800/90 data-[state=on]:to-black/90 data-[state=on]:backdrop-blur-md data-[state=on]:text-primary-foreground data-[state=on]:shadow-md data-[state=on]:border data-[state=on]:border-white/10",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input/80 bg-transparent/30 backdrop-blur-sm hover:bg-accent/20 hover:text-accent-foreground hover:border-accent/80",
        glass: "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
