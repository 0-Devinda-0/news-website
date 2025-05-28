'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

const Navbar: React.FC = () => {
  const { user, isLoading } = useUser();

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
      {/* Company Title (Left) */}
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          .Next News
        </Link>
      </div>

      {/* User Info (Right) */}
      <div className="flex items-center space-x-4">
        {isLoading ? (
          // Loading state for user data
          <div className="animate-pulse flex space-x-4 items-center">
            <div className="rounded-full bg-gray-300 h-10 w-10"></div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
        ) : user ? (
          // Display user image and name if logged in
          <>
            <Link href="#" className="flex items-center space-x-2">
              {user.picture && (
                <Image
                  src={user.picture}
                  alt={user.name || 'User Avatar'}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-indigo-500"
                />
              )}
              <span className="text-gray-700 font-medium hidden md:block">
                {user.name}
              </span>
            </Link>
            {/* Logout button */}
            <Link
              href="/auth/logout"
              className="px-4 py-2 bg-white-500 text-black border-2 rounded-md hover:bg-stone-950 hover:text-white transition-color duration-200"
            >
              Logout
            </Link>
          </>
        ) : (
          // Login button if not logged in
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;