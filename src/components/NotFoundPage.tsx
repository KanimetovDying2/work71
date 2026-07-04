const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <h1 className="text-9xl font-extrabold text-indigo-100 select-none">
        404
      </h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">Page not found</h2>
      <p className="text-gray-500 mt-2 max-w-sm">Oops!</p>
      <a
        href="/admin/dishes"
        className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-indigo-200 font-medium"
      >
        Back to Admin
      </a>
    </div>
  );
};
export default NotFoundPage;
