import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export function AppPageProvider({ children }: IProps) {
  return <div style={{ position: 'relative', padding: 20, height: '100%' }}>{children}</div>;
}
