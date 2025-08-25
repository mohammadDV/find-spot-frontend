import React from 'react';
import { cn } from '@/lib/utils';

export interface StarProps extends React.SVGProps<SVGSVGElement> {
  /**
   * The size of the star. Can be 'small', 'medium', 'large', or a number representing pixels
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | number;
  /**
   * The fill color of the star
   * @default '#F59E0B' (amber/yellow)
   */
  fill?: string;
}

export const Star = ({
  size = 'medium',
  fill = '#F59E0B',
  className,
  ...props
}: StarProps) => {
  const sizeMap = {
    small: 12,
    medium: 16,
    large: 24,
  };

  const pixelSize = typeof size === 'string' ? sizeMap[size] : size;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill={fill}
      className={cn('', className)}
      {...props}
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
};

export default Star;