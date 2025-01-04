interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="text-center">
        <p className="text-red-500 mb-4">{message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-[#00a6ed] text-white px-4 py-2 rounded-lg hover:bg-[#0095d6] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}