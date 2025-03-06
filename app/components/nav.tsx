import React from 'react';
import Link from 'next/link';
import { Home, Search, Headphones, User } from 'lucide-react';

const Nav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg 
      md:top-0 md:bottom-auto 
      flex justify-around items-center py-3 px-4">
      {/* Mobile */}
      <Link href="/" className="md:hidden text-gray-600 hover:text-black transition-colors">
        <div className="flex flex-col items-center">
          <Home className="w-6 h-6" />
        </div>
      </Link>
      
      <Link href="/search" className="md:hidden text-gray-600 hover:text-black transition-colors">
        <div className="flex flex-col items-center">
          <Search className="w-6 h-6" />
        </div>
      </Link>
      
      <Link href="/events" className="md:hidden text-gray-600 hover:text-black transition-colors">
        <div className="flex flex-col items-center">
          <Headphones className="w-6 h-6" />
        </div>
      </Link>
      
      <Link href="/profile" className="md:hidden text-gray-600 hover:text-black transition-colors">
        <div className="flex flex-col items-center">
          <User className="w-6 h-6" />
        </div>
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
          Home
        </Link>
        <Link href="/search" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
          Search
        </Link>
        <Link href="/events" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
          Music
        </Link>
        <Link href="/profile" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Nav;