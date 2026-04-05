import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-sm font-body font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-violet-800 text-white hover:bg-violet-900 shadow-md",
    secondary: "bg-violet-100 text-violet-900 hover:bg-violet-200",
    outline: "border-2 border-violet-800 text-violet-800 hover:bg-violet-50",
    ghost: "text-violet-800 hover:bg-violet-50",
    link: "text-violet-800 underline-offset-4 hover:underline p-0 h-auto",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base tracking-wide",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export const Badge = ({ className, variant = "default", children, ...props }) => {
  const variants = {
    default: "bg-violet-100 text-violet-800 border-violet-200",
    new: "bg-green-100 text-green-800 border-green-200",
    sale: "bg-red-100 text-red-800 border-red-200",
    outline: "border border-violet-400 text-violet-600 bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold font-body transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
