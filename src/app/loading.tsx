
const Loading = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="h-10 w-10 md:h-12 md:w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-700" />

      <p className="text-lg font-medium text-gray-600">
        বাজারদর লোড হচ্ছে...
      </p>
    </div>
  );
};

export default Loading;
