'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data.session) {
          setStatus('success');
          // Redirect to dashboard after successful authentication
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        } else {
          setStatus('error');
          setError('Authentication failed. Please try again.');
        }
      } catch (err) {
        setStatus('error');
        setError('Authentication failed. Please try again.');
        console.error('Auth callback error:', err);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="card text-center">
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Signing you in...
              </h1>
              
              <p className="text-gray-600">
                Please wait while we complete your authentication.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Successfully signed in!
              </h1>
              
              <p className="text-gray-600">
                Redirecting you to your dashboard...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Authentication failed
              </h1>
              
              <p className="text-gray-600 mb-6">
                {error}
              </p>
              
              <button
                onClick={() => router.push('/auth')}
                className="btn-primary w-full"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 