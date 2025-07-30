'use client';

import { useState } from 'react';

export default function DebugPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [email, setEmail] = useState('');

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testEnvironmentVariables = () => {
    addLog('=== Testing Environment Variables ===');
    addLog(`NEXT_PUBLIC_SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET'}`);
    addLog(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'}`);
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      addLog(`URL starts with: ${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 20)}...`);
    }
    if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      addLog(`Key starts with: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...`);
    }
  };

  const testSupabaseImport = async () => {
    addLog('=== Testing Supabase Import ===');
    try {
      const { supabase } = await import('@/lib/supabase');
      addLog('✅ Supabase client imported successfully');
      
      // Test basic connection
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        addLog(`❌ Connection error: ${error.message}`);
      } else {
        addLog('✅ Supabase connection successful');
      }
    } catch (err) {
      addLog(`❌ Import error: ${err}`);
    }
  };

  const testMagicLink = async () => {
    if (!email) {
      addLog('❌ Please enter an email address');
      return;
    }

    addLog(`=== Testing Magic Link for ${email} ===`);
    
    try {
      const { signInWithMagicLink } = await import('@/lib/supabase');
      addLog('✅ signInWithMagicLink imported');
      
      const result = await signInWithMagicLink(email);
      addLog(`Result: ${JSON.stringify(result, null, 2)}`);
      
      if (result.error) {
        const errorMessage = typeof result.error === 'object' && result.error && 'message' in result.error 
          ? (result.error as any).message 
          : result.error;
        addLog(`❌ Magic link error: ${errorMessage}`);
      } else {
        addLog('✅ Magic link sent successfully');
      }
    } catch (err) {
      addLog(`❌ Magic link test error: ${err}`);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Supabase Debug Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <button
              onClick={testEnvironmentVariables}
              className="w-full bg-blue-500 text-white p-3 rounded"
            >
              Test Environment Variables
            </button>
            
            <button
              onClick={testSupabaseImport}
              className="w-full bg-green-500 text-white p-3 rounded"
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
                className="w-full bg-purple-500 text-white p-3 rounded"
              >
                Test Magic Link
              </button>
            </div>
            
            <button
              onClick={clearLogs}
              className="w-full bg-gray-500 text-white p-3 rounded"
            >
              Clear Logs
            </button>
          </div>
          
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-96 overflow-y-auto">
            <div className="mb-2 font-bold">Debug Logs:</div>
            {logs.length === 0 ? (
              <div className="text-gray-500">No logs yet. Run a test to see results.</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 