import { auth0 } from "@/lib/auth0";
// import { getAccessToken } from '@auth0/nextjs-auth0';
import './globals.css';


export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  // If no session, show sign-up and login buttons


  // If session exists, show a welcome message and logout button
  return (
   <div className="min-h-screen bg-gray-100 text-gray-900">

  <main className="max-w-3xl mx-auto px-4 py-12 text-center">
    <h1 className="text-3xl font-semibold mb-8">
      Welcome{session && <span className="text-blue-600">, {session.user.name}!</span>}
    </h1>

    {session ? (
      <div className="space-y-4">
        <a href="/admin">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Continue
          </button>
        </a>
        <a href="/auth/logout">
          <button className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">
            Logout
          </button>
        </a>
      </div>
    ) : (
      <div className="space-y-4">
        <p className="text-lg">Please sign up or log in to continue.</p>
        <a href="/auth/login">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Login
          </button>
        </a>
      </div>
    )}
  </main>
</div>

  );
}