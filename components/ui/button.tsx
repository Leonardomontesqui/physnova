import React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot"; //I think i have to download this
import { cn } from "@/lib/utils";

const buttonVariants = cva("flex  border rounded-xl items-center", {
  variants: {
    variant: {
      default: "border-[#dedede] bg-white",
      secondary: "",
      cta: "bg-[#4356ff] text-white",
    },
    size: { default: "py-1 px-2 gap-1 text-sm", lg: "px-4 py-2 gap-2" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
