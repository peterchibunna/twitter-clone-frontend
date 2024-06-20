interface ErrorProps {
  errorText: string;
}
export const ErrorDisplay = ({errorText}: ErrorProps) => {
  return (
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
         role="alert">
      <span className="font-medium">Error!</span> {errorText}
    </div>
  );
};
