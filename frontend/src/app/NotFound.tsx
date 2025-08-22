import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-9xl font-extrabold text-[#85D1DB]">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">
            The page you're looking for doesn't exist!
        </p>
        <Link 
          to="/" 
          className="mt-6 inline-block px-6 py-3 font-bold text-white bg-green-500 rounded-xl hover:bg-green-600 transition-colors duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;