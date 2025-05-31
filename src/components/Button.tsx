import React, { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className = '',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;

    // Base classes
    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative overflow-hidden";

    // Variant classes
    const variantClasses = {
      primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-soft hover:shadow-medium hover:from-primary-700 hover:to-primary-800 focus-visible:ring-primary-500 transform hover:scale-[1.02] active:scale-[0.98]",
      secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-soft hover:shadow-medium hover:from-secondary-600 hover:to-secondary-700 focus-visible:ring-secondary-500 transform hover:scale-[1.02] active:scale-[0.98]",
      outline: "border-2 border-primary-600 text-primary-600 bg-transparent hover:bg-primary-600 hover:text-white focus-visible:ring-primary-500 transform hover:scale-[1.02] active:scale-[0.98]",
      ghost: "text-primary-600 hover:bg-primary-50 hover:text-primary-700 focus-visible:ring-primary-500",
      danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-soft hover:shadow-medium hover:from-red-600 hover:to-red-700 focus-visible:ring-red-500 transform hover:scale-[1.02] active:scale-[0.98]",
      success: "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-soft hover:shadow-medium hover:from-accent-600 hover:to-accent-700 focus-visible:ring-accent-500 transform hover:scale-[1.02] active:scale-[0.98]",
      warning: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-soft hover:shadow-medium hover:from-yellow-600 hover:to-yellow-700 focus-visible:ring-yellow-500 transform hover:scale-[1.02] active:scale-[0.98]",
      link: "text-primary-600 underline-offset-4 hover:underline focus-visible:ring-primary-500",
    };

    // Size classes
    const sizeClasses = {
      xs: "h-8 px-3 text-xs",
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-sm",
      lg: "h-12 px-8 text-base",
      xl: "h-14 px-10 text-lg",
      icon: "h-10 w-10",
    };

    // Combine classes
    const combinedClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? "w-full" : "",
      className
    ].filter(Boolean).join(" ");

    return (
      <button
        className={combinedClasses}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* Shimmer effect for primary and secondary variants */}
        {(variant === 'primary' || variant === 'secondary') && (
          <div className="absolute inset-0 -top-px overflow-hidden rounded-xl">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-shimmer" />
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}

        <div className={`flex items-center gap-2 ${loading ? "opacity-0" : ""}`}>
          {leftIcon && (
            <span className="transition-transform duration-300 group-hover:scale-110">
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className="transition-transform duration-300 group-hover:scale-110">
              {rightIcon}
            </span>
          )}
        </div>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;
