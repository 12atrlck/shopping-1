import React from 'react';
import { User } from '../types';

interface AdminUsersProps {
  users: User[];
}

export const AdminUsers: React.FC<AdminUsersProps> = ({ users }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Registered Users</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <img className="h-16 w-16 rounded-full border border-gray-100" src={user.avatar} alt={user.name} />
            <div>
              <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                }`}>
                  {user.role}
                </span>
                <span className="text-xs text-gray-400">
                  Active: {new Date(user.lastActive).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};