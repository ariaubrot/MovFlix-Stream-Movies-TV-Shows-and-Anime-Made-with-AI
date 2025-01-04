import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message?: string;
  retry?: () => void;
}

export function ErrorMessage({ message = 'Something went wrong', retry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-lg font-medium text-red-500 mb-4">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}