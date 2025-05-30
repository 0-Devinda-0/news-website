import { auth0 } from "@/lib/auth0";
import { redirect } from 'next/navigation';
import './globals.css';

export default async function Home() {
  const session = await auth0.getSession();

  if (session) {
    // Redirect logged-in users to /news
    redirect('/news');
  }

  return (
    <div className="h-dvh font-roboto flex bg-gray-100 text-gray-900">
      <div className="content-center justify-center flex flex-col items-center w-full max-w-4xl mx-auto p-6">
        <h1 className="text-6xl font-semibold mb-8">
          Welcome to <span className="text-blue-700">.Next News</span>
        </h1>
        <p className="italic text-lg">Breaking News, Unbroken Trust.</p>
        <div className="space-y-4 
        mt-8 text-center">
          
          <a href="/auth/login">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Login
            </button>
          </a>
          <a href="/auth/login">
            <button className="px-6 mx-3 py-2 border-3 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-700 transition">
              Sign Up
            </button>
          </a>
          <p className="text-sm mt-3">Please sign up or log in to continue.</p>
        </div>
      </div>
    </div>
  );
}
