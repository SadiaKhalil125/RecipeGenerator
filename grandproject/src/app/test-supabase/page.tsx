'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestSupabasePage() {
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');

  const testConnection = async () => {
    setStatus('Testing connection...');
    
    try {
      // Test basic connection
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        setStatus(`Connection error: ${error.message}`);
      } else {
        setStatus('Connection successful! Supabase is working.');
      }
    } catch (err) {
      setStatus(`Error: ${err}`);
    }
  };

  const testMagicLink = async () => {
    if (!email) {
      setStatus('Please enter an email address');
      return;
    }

    setStatus('Sending magic link...');
    
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        setStatus(`Magic link error: ${error.message}`);
      } else {
        setStatus('Magic link sent successfully! Check your email.');
      }
    } catch (err) {
      setStatus(`Error: ${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Supabase Test Page</h1>
        
        <div className="space-y-4">
          <button
            onClick={testConnection}
            className="w-full bg-blue-500 text-white p-3 rounded"
          >
            Test Supabase Connection
          </button>
          
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter email to test magic link"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded"
            />
            <button
              onClick={testMagicLink}
              className="w-full bg-green-500 text-white p-3 rounded"
            >
              Test Magic Link
            </button>
          </div>
          
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Status:</h3>
            <p className="text-sm">{status || 'No test run yet'}</p>
          </div>
          
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Environment Variables:</h3>
            <p className="text-sm">
              URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set'}<br/>
              Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 