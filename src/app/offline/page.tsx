'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  useEffect(() => {
    // Check if we're back online
    const handleOnline = () => {
      window.location.reload();
    };

    window.addEventListener('online', handleOnline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-6">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">You're Offline</h1>
          <p className="text-muted-foreground mb-6">
            TribeTaxi requires an internet connection to book rides and track your journey.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">What you can do offline:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• View your recent ride history</li>
              <li>• Access saved locations</li>
              <li>• View fare information</li>
            </ul>
          </div>
          
          <Button 
            onClick={() => window.location.reload()} 
            className="w-full"
          >
            Try Again
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Make sure your Wi-Fi or mobile data is turned on
          </p>
        </div>
      </div>
    </div>
  );
}