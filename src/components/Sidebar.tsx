import React from 'react';
import { Home, Film, Clock, User } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-14 h-screen w-16 bg-[#0F0F0F] flex flex-col items-center py-2">
      <nav className="w-full">
        <div className="flex flex-col items-center gap-4">
          <a className="w-full flex flex-col items-center px-1 py-4 text-white hover:bg-[#272727] cursor-pointer">
            <Home size={20} />
            <span className="text-[10px] mt-1">Home</span>
          </a>

          <a className="w-full flex flex-col items-center px-1 py-4 text-white hover:bg-[#272727] cursor-pointer">
            <Film size={20} />
            <span className="text-[10px] mt-1">Shorts</span>
          </a>

          <a className="w-full flex flex-col items-center px-1 py-4 text-white hover:bg-[#272727] cursor-pointer">
            <div className="relative">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M10,18v-6l5,3L10,18z M17,3H7v1h10V3z M20,6H4v1h16V6z M22,9H2v12h20V9z M3,10h18v10H3V10z"/>
              </svg>
            </div>
            <span className="text-[10px] mt-1">Subscriptions</span>
          </a>

          <a className="w-full flex flex-col items-center px-1 py-4 text-white hover:bg-[#272727] cursor-pointer">
            <User size={20} />
            <span className="text-[10px] mt-1">You</span>
          </a>
        </div>
      </nav>
    </aside>
  );
}