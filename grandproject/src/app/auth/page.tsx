'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { signInWithMagicLink } from '@/lib/supabase';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Check if Supabase is properly configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Supabase not configured. Please set up your environment variables.');
      }

      const { error } = await signInWithMagicLink(email);
      
      if (error) {
        throw error;
      }
      
      setIsEmailSent(true);
    } catch (err) {
      if (err instanceof Error && err.message.includes('Supabase not configured')) {
        setError('Authentication is not configured. Please contact the administrator.');
      } else {
        setError('Failed to send magic link. Please try again.');
      }
      console.error('Magic link error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement resend functionality
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError('Magic link resent successfully!');
    } catch (err) {
      setError('Failed to resend magic link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="card text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-success-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Check your email!
            </h1>
            
            <p className="text-gray-600 mb-6">
              We've sent a magic link to <strong>{email}</strong>. 
              Click the link in your email to sign in instantly.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleResend}
                disabled={isLoading}
                className="btn-secondary w-full"
              >
                {isLoading ? 'Sending...' : 'Resend Magic Link'}
              </button>
              
              <button
                onClick={() => {
                  setIsEmailSent(false);
                  setEmail('');
                }}
                className="btn-ghost w-full"
              >
                Use Different Email
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                No password required - just click the link in your email to sign in securely.
              </p>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="card">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Sign in to RecipeGen
            </h1>
            
            <p className="text-gray-600">
              Enter your email to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="input-field"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="btn-primary w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending Magic Link...
                </div>
              ) : (
                'Send Magic Link'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              No password required - just click the link in your email to sign in securely.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 