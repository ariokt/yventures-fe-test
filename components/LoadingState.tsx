'use client';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 text-base font-medium">Loading posts...</p>
      <p className="mt-1 text-gray-400 text-sm">
        Fetching data from JSONPlaceholder API
      </p>
    </div>
  );
}