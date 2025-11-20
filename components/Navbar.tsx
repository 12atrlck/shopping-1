import React from 'react';
import { ShoppingCart, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  onCartClick: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, cartCount, onCartClick, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <span className="font-bold text-lg">L</span>
          </div>
          <span className="text-xl font-bold text-gray-900 hidden sm:block">Lumina</span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                {user.role === UserRole.ADMIN ? <Shield className="w-4 h-4 text-indigo-600" /> : <UserIcon className="w-4 h-4" />}
                <span className="font-medium">{user.name}</span>
                <span className="text-xs opacity-75">({user.role})</span>
              </div>

              {user.role === UserRole.USER && (
                <button 
                  onClick={onCartClick}
                  className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                      {cartCount}
                    </span>
                  )}
                </button>
              )}

              <button
                onClick={onLogout}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <span className="text-sm text-gray-500">Guest Mode</span>
          )}
        </div>
      </div>
    </nav>
  );
};