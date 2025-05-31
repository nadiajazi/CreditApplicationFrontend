import React from 'react';

interface AnimatedContainerProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'none';
  delay?: number;
  className?: string;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  animation = 'fade-in',
  delay = 0,
  className = '',
}) => {
  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'slide-up':
        return 'animate-slide-up';
      default:
        return '';
    }
  };

  const style = delay > 0 ? { animationDelay: `${delay}ms` } : {};

  return (
    <div className={`${getAnimationClass()} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default AnimatedContainer;