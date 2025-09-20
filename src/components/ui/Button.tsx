import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-semibold transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden group flex-row 
  `;

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: `
      bg-primary text-tertiary border-2 border-tertiary
      hover:bg-tertiary hover:text-primary hover:border-tertiary
      focus:ring-tertiary
      before:absolute before:inset-0 before:bg-tertiary
      before:opacity-0 before:transition-opacity before:duration-300
      hover:before:opacity-10
    `,
    secondary: `
      bg-transparent text-tertiary border-2 border-tertiary
      hover:bg-tertiary hover:text-primary hover:border-tertiary
      focus:ring-tertiary
      before:absolute before:inset-0 before:bg-tertiary
      before:opacity-0 before:transition-opacity before:duration-300
      hover:before:opacity-10
    `,
    outline: `
      bg-transparent text-tertiary border-2 border-tertiary
      hover:bg-tertiary hover:text-primary hover:border-tertiary
      focus:ring-tertiary
      before:absolute before:inset-0 before:bg-tertiary
      before:opacity-0 before:transition-opacity before:duration-300
      hover:before:opacity-10
    `,
    ghost: `
      bg-transparent text-tertiary border-2 border-transparent
      hover:bg-tertiary hover:text-primary hover:border-tertiary
      focus:ring-tertiary
      before:absolute before:inset-0 before:bg-tertiary
      before:opacity-0 before:transition-opacity before:duration-300
      hover:before:opacity-10
    `,
    underline: `
      bg-transparent border-0 text-tertiary
      focus:ring-tertiary
      relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-tertiary
      after:transition-all after:duration-300 hover:after:w-full
    `,
  } as const;

  const combinedStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedStyles}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
