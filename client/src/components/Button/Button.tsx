import React from 'react';

type ButtonProps = {
  size?: 'small' | 'medium' | 'large',
  className?: string,
  onClick?: () => void,
  disabled?: boolean,
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  className = '',
  onClick,
  disabled = false,
  children
}) => {
  // Generate class names based on size and additional class names
  const buttonClasses = `button ${size} ${className}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
