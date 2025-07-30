'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function SupabaseTestPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    addLog('Page loaded - checking environment variables...');
    addLog(`NEXT_PUBLIC_SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET'}`);
    addLog(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'}`);
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      addLog(`URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
    }
    if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      addLog(`Key starts with: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...`);
    }
  }, []);

  const testSupabaseConnection = async () => {
    setIsLoading(true);
    addLog('=== Testing Supabase Connection ===');
    
    try {
      // Test basic connection
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        addLog(`❌ Connection error: ${error.message}`);
        addLog(`Error details: ${JSON.stringify(error)}`);
      } else {
        addLog('✅ Supabase connection successful');
        addLog(`Session data: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      addLog(`❌ Unexpected error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testMagicLink = async () => {
    if (!email) {
      addLog('❌ Please enter an email address');
      return;
    }

    setIsLoading(true);
    addLog(`=== Testing Magic Link for ${email} ===`);
    addLog(`Current origin: ${window.location.origin}`);
    addLog(`Redirect URL: ${window.location.origin}/auth/callback`);
    
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      addLog(`Response data: ${JSON.stringify(data, null, 2)}`);
      
      if (error) {
        addLog(`❌ Magic link error: ${error.message}`);
        addLog(`Error details: ${JSON.stringify(error, null, 2)}`);
        
        // Provide specific guidance based on error
        if (error.message.includes('Email not confirmed')) {
          addLog('💡 This might mean email authentication is not enabled in your Supabase project');
        } else if (error.message.includes('Invalid redirect')) {
          addLog('💡 Check your Supabase project settings - redirect URLs might not be configured');
        } else if (error.message.includes('rate limit')) {
          addLog('💡 Rate limit exceeded - wait a few minutes and try again');
        }
      } else {
        addLog('✅ Magic link sent successfully!');
        addLog('📧 Check your email for the magic link');
      }
    } catch (err) {
      addLog(`❌ Unexpected error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const copyLogs = () => {
    const logText = logs.join('\n');
    navigator.clipboard.writeText(logText);
    addLog('📋 Logs copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Supabase Magic Link Debug</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
              
              <div className="space-y-4">
                <button
                  onClick={testSupabaseConnection}
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-3 rounded font-medium"
                >
                  {isLoading ? 'Testing...' : 'Test Supabase Connection'}
                </button>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>
                
                <button
                  onClick={testMagicLink}
                  disabled={isLoading || !email}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white p-3 rounded font-medium"
                >
                  {isLoading ? 'Sending...' : 'Test Magic Link'}
                </button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Log Controls</h2>
              <div className="flex space-x-4">
                <button
                  onClick={clearLogs}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
                >
                  Clear Logs
                </button>
                <button
                  onClick={copyLogs}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white p-2 rounded"
                >
                  Copy Logs
                </button>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
              <h3 className="font-semibold text-yellow-800 mb-2">Common Issues:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Email authentication not enabled in Supabase</li>
                <li>• Redirect URLs not configured in project settings</li>
                <li>• Email templates not set up</li>
                <li>• Rate limiting (wait a few minutes)</li>
                <li>• Network/CORS issues</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Debug Logs</h2>
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-gray-500">No logs yet. Run a test to see results.</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-1 whitespace-pre-wrap">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 