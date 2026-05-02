import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-blue/10 text-blue',
  secondary: 'bg-teal/10 text-teal',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber/10 text-amber',
  danger: 'bg-red-100 text-red-800',
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', className = '', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
export default Badge;
