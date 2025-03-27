
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  "rounded-xl transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-100 shadow-sm",
        glass: "bg-white/80 backdrop-blur-sm shadow-md border border-gray-100",
        outline: "bg-transparent border border-gray-200",
        filled: "bg-medical-lightBlue",
        ghost: "border-0 shadow-none",
      },
      size: {
        default: "p-4",
        sm: "p-3",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card, cardVariants };
