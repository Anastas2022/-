// src/components/Layout.tsx
import { ReactNode } from 'react';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 container mx-auto p-4">{children}</main>
  </div>
);

export default Layout;
