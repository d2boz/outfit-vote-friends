
import React, { ReactNode } from 'react';
import Header from './Header';
import { cn } from '@/lib/utils';
import AnimatedTransition from './AnimatedTransition';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={cn("flex-1 pt-24 pb-12", className)}>
        <AnimatedTransition>
          <div className="container max-w-6xl mx-auto px-4">
            {children}
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default Layout;
