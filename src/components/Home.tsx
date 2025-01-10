"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function HomeComponent() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F0F0F] text-gray-200 p-4">
      <div className="max-w-md w-full bg-[#272727] rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Sign In to See Your Playlists
        </h2>
        <p className="text-gray-400 mb-6">
          After signing in, you can view your personalized playlist. <br />
          Check out playlists from some YouTube channels below:
        </p>
        <ul className="text-gray-500 mb-6">
          <li>UCpVm7bg6pXKo1Pr6k5kxG9A</li>
          <li>UC_x5XG1OV2P6uZZ5FSM9Ttw</li>
          <li>UCsT0YIqwnpJCM-mx7-gSA4Q</li>
        </ul>
        <button 
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors" 
          onClick={() => signIn("google")}
        >
          Sign in to Continue
        </button>
      </div>
    </div>
  );
}
