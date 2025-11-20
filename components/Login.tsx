import React from 'react';
import { User, UserRole } from '../types';
import { Button } from './Button';
import { Shield, Users } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Lumina
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Select your role to enter the simulation
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mt-8">
          <div 
            onClick={() => onLogin(UserRole.ADMIN)}
            className="cursor-pointer group relative flex items-center gap-4 rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 transition-all"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Admin Access</h3>
              <p className="text-sm text-gray-500">Manage inventory, view financials, and track users.</p>
            </div>
          </div>

          <div 
            onClick={() => onLogin(UserRole.USER)}
            className="cursor-pointer group relative flex items-center gap-4 rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:border-green-500 hover:ring-1 hover:ring-green-500 transition-all"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Customer Access</h3>
              <p className="text-sm text-gray-500">Browse products, add to cart, and simulate purchase.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};