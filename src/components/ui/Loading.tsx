// Loading component for displaying loading states
// This provides a consistent loading experience across the application

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export function Loading({ size = 'md', text, className = '' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <Loader2 className={`animate-spin text-tertiary ${sizeClasses[size]}`} />
      {text && (
        <p className={`mt-2 text-gray-600 ${textSizes[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
}

// Full page loading component
interface FullPageLoadingProps {
  text?: string;
}

export function FullPageLoading({ text = 'Loading...' }: FullPageLoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <Loading size="lg" text={text} />
      </div>
    </div>
  );
}

// Inline loading component
interface InlineLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function InlineLoading({ size = 'sm', className = '' }: InlineLoadingProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <Loader2 className={`animate-spin text-tertiary ${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}`} />
    </div>
  );
}

// Button loading component
interface ButtonLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ButtonLoading({ size = 'sm', className = '' }: ButtonLoadingProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <Loader2 className={`animate-spin text-white ${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}`} />
    </div>
  );
}

// Skeleton loading component
interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className = '', lines = 1 }: SkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 rounded h-4 mb-2 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

// Product skeleton loading
export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2" />
        <div className="h-3 bg-gray-200 rounded mb-2 w-3/4" />
        <div className="h-6 bg-gray-200 rounded mb-3 w-1/2" />
        <div className="h-8 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

// Cart skeleton loading
export function CartSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded mb-4" />
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
          <div className="h-8 bg-gray-200 rounded w-20" />
        </div>
      ))}
      <div className="border-t pt-4">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
} 