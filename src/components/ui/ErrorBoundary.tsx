// Error boundary component for handling React errors gracefully
// This provides a fallback UI when errors occur in the component tree

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 mb-2">
                  Error Details (Development)
                </summary>
                <pre className="text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center px-4 py-2 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Error message component for displaying errors
interface ErrorMessageProps {
  error: string | Error;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({ error, onRetry, className = '' }: ErrorMessageProps) {
  const errorText = typeof error === 'string' ? error : error.message;

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800 mb-1">
            Error
          </h3>
          <p className="text-sm text-red-700 mb-3">
            {errorText}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center text-sm text-red-600 hover:text-red-800 font-medium"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Error alert component for inline error display
interface ErrorAlertProps {
  error: string | Error;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorAlert({ error, onDismiss, className = '' }: ErrorAlertProps) {
  const errorText = typeof error === 'string' ? error : error.message;

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-red-700">
            {errorText}
          </p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-3 text-red-400 hover:text-red-600"
          >
            <span className="sr-only">Dismiss</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// Network error component
interface NetworkErrorProps {
  onRetry?: () => void;
  className?: string;
}

export function NetworkError({ onRetry, className = '' }: NetworkErrorProps) {
  return (
    <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-yellow-800 mb-1">
            Network Error
          </h3>
          <p className="text-sm text-yellow-700 mb-3">
            Please check your internet connection and try again.
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center text-sm text-yellow-600 hover:text-yellow-800 font-medium"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 