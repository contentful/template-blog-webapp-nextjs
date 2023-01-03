import { HTMLProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ArticleLabelProps extends HTMLProps<HTMLSpanElement> {
  children: ReactNode;
}

export const ArticleLabel = ({ children, className, ...props }: ArticleLabelProps) => {
  return (
    <span
      className={twMerge(
        'rounded bg-purple200 px-2 py-1 text-2xs font-semibold uppercase leading-none tracking-widest text-purple600',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
