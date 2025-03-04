
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonTransitionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "luxury"
  size?: "default" | "sm" | "lg" | "icon"
}

const ButtonTransition = React.forwardRef<HTMLButtonElement, ButtonTransitionProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all relative overflow-hidden group",
          "before:absolute before:inset-0 before:bg-foreground/5 before:scale-x-0 before:origin-right before:transition-transform before:duration-300",
          "hover:before:scale-x-100 hover:before:origin-left",
          {
            "bg-primary text-primary-foreground shadow-sm": variant === "default",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "bg-gradient-to-r from-hotel-400 to-hotel-500 hover:from-hotel-500 hover:to-hotel-600 text-white shadow-sm": variant === "luxury",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
ButtonTransition.displayName = "ButtonTransition"

export { ButtonTransition }
