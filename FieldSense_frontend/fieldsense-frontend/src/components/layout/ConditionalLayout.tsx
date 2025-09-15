"use client";

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname();
  
  // Check if current route is a dashboard route
  const isDashboardRoute = pathname?.startsWith('/dashboard');
  
  // If it's a dashboard route, render without navbar and footer
  if (isDashboardRoute) {
    return <>{children}</>;
  }
  
  // For all other routes, render with navbar and footer
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default ConditionalLayout;
