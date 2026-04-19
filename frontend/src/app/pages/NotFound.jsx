export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-4">🐾</div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
          Oops! This page went to chase a squirrel
        </p>
        <a
          href="/"
          className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full transition-all transform hover:scale-105 font-semibold"
        >
          <span>Back to Home</span>
        </a>
      </div>
    </div>
  );
}
