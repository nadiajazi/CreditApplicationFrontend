import React, { forwardRef, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className = '',
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    variant = 'outlined',
    size = 'md',
    fullWidth = false,
    type,
    disabled,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    // Base classes
    const baseClasses = "transition-all duration-300 focus:outline-none";

    // Variant classes
    const variantClasses = {
      default: "border-0 border-b-2 border-neutral-300 bg-transparent focus:border-primary-500 rounded-none",
      filled: "border border-neutral-300 bg-neutral-50 focus:bg-white focus:border-primary-500 rounded-lg",
      outlined: "border border-neutral-300 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 rounded-lg",
    };

    // Size classes
    const sizeClasses = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 text-base",
      lg: "h-12 px-5 text-lg",
    };

    // Error state classes
    const errorClasses = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "";

    // Disabled state classes
    const disabledClasses = disabled
      ? "opacity-50 cursor-not-allowed bg-neutral-100"
      : "";

    // Combine classes
    const inputClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      errorClasses,
      disabledClasses,
      leftIcon ? "pl-10" : "",
      rightIcon || isPassword ? "pr-10" : "",
      fullWidth ? "w-full" : "",
      className
    ].filter(Boolean).join(" ");

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-neutral-400">
                {leftIcon}
              </span>
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={inputClasses}
            disabled={disabled}
            {...props}
          />
          
          {(rightIcon || isPassword) && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {isPassword ? (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              ) : (
                <span className="text-neutral-400">
                  {rightIcon}
                </span>
              )}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <div className="mt-2">
            {error && (
              <p className="text-sm text-red-600 animate-fade-in">
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-sm text-neutral-500">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export default Input;
