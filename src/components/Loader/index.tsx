export function Loader() {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500">
        <div className="sr-only">Loading...</div>
      </div>
    </div>
  );
}
