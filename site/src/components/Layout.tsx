import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { ServerStrip } from './ServerStrip';

export function Layout({ children }: { children: ReactNode }) {
  return <><ServerStrip/><Header/><main>{children}</main><Footer/></>;
}
