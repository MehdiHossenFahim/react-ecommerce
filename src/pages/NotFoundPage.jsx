import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center animate-fade-in">
      <div className="text-8xl font-black text-indigo-600/20 select-none">404</div>
      <h1 className="text-3xl font-extrabold text-slate-900 mt-2 mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">
        Sorry, the page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition active:scale-95"
      >
        <Home className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
