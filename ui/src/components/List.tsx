import { HTMLAttributes } from 'react';

type ListProps = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLUListElement>;

export const List: React.FC<ListProps> = ({ children, ...props }) => {
  return <ul {...props}>{children}</ul>;
};
