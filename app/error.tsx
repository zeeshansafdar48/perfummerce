"use client"

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center min-h-[60vh]">
      <Alert variant="destructive" className="max-w-lg w-full text-center">
        <AlertTitle className="text-2xl font-bold mb-2">Something went wrong</AlertTitle>
        <AlertDescription>
          <p className="mb-4">{error?.message || 'An unexpected error occurred. Please try again.'}</p>
          <Button variant="default" onClick={() => reset()}>
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
