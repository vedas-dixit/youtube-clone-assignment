import './globals.css';
import type { ReactNode } from "react";
import SessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
        <Sidebar />
        <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}