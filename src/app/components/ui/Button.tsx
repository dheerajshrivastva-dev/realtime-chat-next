import { cn } from "@/app/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, FC } from "react";
import Loader from "./LoaderIos";

export const buttonVariants = cva(
  ` actve:scale-95
    inline-flex items-center justify-center rounded-md text-sm font-medium
    transition-color
    focus:outline-none
    focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none
  `,
  {
    variants: {
      variant: {
        default: "bg-pink-700 text-white hover:bg-pink-600",
        ghost: "bg-transparent hover:text-slate-900 hover:bg-pink-400",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  size,
  isLoading,
  ...rest
}) => {
  return (
    <button className={cn(buttonVariants({variant, size, className}))} disabled={isLoading} {...rest}>
      {isLoading ? <Loader className={`h-4 w-4 ${children ? 'mr-2' : ""}`} isLoading /> : null}
      {children}
    </button>
  );
};

export default Button;
