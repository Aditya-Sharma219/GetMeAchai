"use client";
import { useSession, signIn, signOut } from "next-auth/react"
import React from 'react';


const Login = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-white">
                <h2 className="text-xl font-bold">Signed in as {session.user.email}</h2>
                <button
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    onClick={() => signOut()}
                >
                    Sign out
                </button>
            </div>
        );
    }
    return (
        <div className='min-h-screen flex flex-col justify-center gap-2 items-center pt-28 text-white px-6 md:px-12 py-16'>
            <h1 className='font-bold text-4xl'>Login</h1>
            <p className="text-lg text-gray-300 pb-12">
                Connect with your audience and get support from your biggest fans.
            </p>
            <div className="flex flex-col space-y-3 w-full max-w-sm mx-auto">

                {/* Google Login */}
                <button
                    className="cursor-pointer flex items-center justify-center w-full px-4 py-2 text-white bg-red-500 rounded-lg transition-all transform hover:scale-105 hover:opacity-90 shadow-md border border-red-600"
                    aria-label="Sign in with Google"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    <span className="ml-2 text-sm font-medium">Continue with Google</span>
                </button>


                {/* Facebook Login */}
                <button className="cursor-pointer flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-lg transition-transform transform hover:scale-105">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.675 0h-21.35C.596 0 0 .6 0 1.337v21.326C0 23.4.596 24 1.325 24h11.52V14.706h-3.13v-3.612h3.13V8.337c0-3.1 1.89-4.788 4.656-4.788 1.323 0 2.464.098 2.796.143v3.24h-1.92c-1.504 0-1.796.716-1.796 1.765v2.316h3.59l-.467 3.612h-3.123V24h6.127c.73 0 1.325-.6 1.325-1.337V1.337C24 .6 23.405 0 22.675 0z" />
                    </svg>
                    Continue with Facebook
                </button>

                {/* LinkedIn Login */}
                <button className="cursor-pointer flex items-center justify-center w-full px-4 py-2 text-white bg-blue-700 rounded-lg transition-transform transform hover:scale-105">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.8 0H4.2C1.9 0 0 1.9 0 4.2v15.6C0 22.1 1.9 24 4.2 24h15.6c2.3 0 4.2-1.9 4.2-4.2V4.2C24 1.9 22.1 0 19.8 0zM7.8 20.1H4.2V9h3.6v11.1zm-1.8-12.7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm14.4 12.7h-3.6v-5.4c0-1.3-.5-2.1-1.7-2.1-1.1 0-1.7.8-1.7 2.1v5.4h-3.6V9h3.6v1.5c.5-.9 1.4-1.7 2.9-1.7 2.1 0 3.7 1.4 3.7 4.4v7.9z" />
                    </svg>
                    Continue with LinkedIn
                </button>

                {/* Twitter Login */}
                <button className="cursor-pointer flex items-center justify-center w-full px-4 py-2 text-white bg-blue-400 rounded-lg transition-transform transform hover:scale-105">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775A4.93 4.93 0 0023.292 3a9.86 9.86 0 01-3.127 1.184A4.92 4.92 0 0016.616 3c-2.732 0-4.95 2.215-4.95 4.944 0 .39.045.765.13 1.125C7.688 8.944 4.065 6.924 1.64 3.952a4.822 4.822 0 00-.67 2.48c0 1.71.87 3.222 2.188 4.105a4.93 4.93 0 01-2.24-.616v.06c0 2.385 1.692 4.37 3.946 4.829a4.996 4.996 0 01-2.224.085c.63 1.97 2.455 3.403 4.617 3.442A9.9 9.9 0 010 19.54a13.97 13.97 0 007.548 2.212c9.05 0 14-7.496 14-14v-.64A9.95 9.95 0 0024 4.59a10.18 10.18 0 01-2.047.564z" />
                    </svg>
                    Continue with Twitter
                </button>

                {/* GitHub Login */}
                <button onClick={() => { signIn('github') }} className="cursor-pointer flex items-center justify-center w-full px-4 py-2 text-white bg-gray-800 rounded-lg transition-transform transform hover:scale-105">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.373 0 12a11.94 11.94 0 008.19 11.385c.6.11.82-.26.82-.578v-2.2c-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.748.083-.732.083-.732 1.204.083 1.836 1.237 1.836 1.237 1.07 1.832 2.809 1.302 3.49.997.108-.775.42-1.303.76-1.603-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.382 1.237-3.22-.123-.302-.536-1.52.116-3.166 0 0 1.008-.322 3.3 1.23.956-.265 1.98-.398 3-.402 1.02.004 2.044.137 3 .402 2.29-1.552 3.296-1.23 3.296-1.23.656 1.646.242 2.864.12 3.166.77.838 1.24 1.91 1.24 3.22 0 4.61-2.804 5.627-5.475 5.922.43.374.814 1.11.814 2.23v3.3c0 .322.214.694.824.576A11.95 11.95 0 0024 12c0-6.627-5.37-12-12-12z" />
                    </svg>
                    Continue with GitHub
                </button>
                <button className="cursor-pointer flex gap-2 items-center justify-center w-full px-4 py-2 text-white bg-gray-800 rounded-lg transition-transform transform hover:scale-105">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 50 50"
                        fill="white"
                    >
                        <path d="M 33.375 0 C 30.539063 0.191406 27.503906 1.878906 25.625 4.15625 C 23.980469 6.160156 22.601563 9.101563 23.125 12.15625 C 22.65625 12.011719 22.230469 11.996094 21.71875 11.8125 C 20.324219 11.316406 18.730469 10.78125 16.75 10.78125 C 12.816406 10.78125 8.789063 13.121094 6.25 17.03125 C 2.554688 22.710938 3.296875 32.707031 8.90625 41.25 C 9.894531 42.75 11.046875 44.386719 12.46875 45.6875 C 13.890625 46.988281 15.609375 47.980469 17.625 48 C 19.347656 48.019531 20.546875 47.445313 21.625 46.96875 C 22.703125 46.492188 23.707031 46.070313 25.59375 46.0625 C 25.605469 46.0625 25.613281 46.0625 25.625 46.0625 C 27.503906 46.046875 28.476563 46.460938 29.53125 46.9375 C 30.585938 47.414063 31.773438 48.015625 33.5 48 C 35.554688 47.984375 37.300781 46.859375 38.75 45.46875 C 40.199219 44.078125 41.390625 42.371094 42.375 40.875 C 43.785156 38.726563 44.351563 37.554688 45.4375 35.15625 C 45.550781 34.90625 45.554688 34.617188 45.445313 34.363281 C 45.339844 34.109375 45.132813 33.910156 44.875 33.8125 C 41.320313 32.46875 39.292969 29.324219 39 26 C 38.707031 22.675781 40.113281 19.253906 43.65625 17.3125 C 43.917969 17.171875 44.101563 16.925781 44.164063 16.636719 C 44.222656 16.347656 44.152344 16.042969 43.96875 15.8125 C 41.425781 12.652344 37.847656 10.78125 34.34375 10.78125 C 32.109375 10.78125 30.46875 11.308594 29.125 11.8125 C 28.902344 11.898438 28.738281 11.890625 28.53125 11.96875 C 29.894531 11.25 31.097656 10.253906 32 9.09375 C 33.640625 6.988281 34.90625 3.992188 34.4375 0.84375 C 34.359375 0.328125 33.894531 -0.0390625 33.375 0 Z M 32.3125 2.375 C 32.246094 4.394531 31.554688 6.371094 30.40625 7.84375 C 29.203125 9.390625 27.179688 10.460938 25.21875 10.78125 C 25.253906 8.839844 26.019531 6.828125 27.1875 5.40625 C 28.414063 3.921875 30.445313 2.851563 32.3125 2.375 Z M 16.75 12.78125 C 18.363281 12.78125 19.65625 13.199219 21.03125 13.6875 C 22.40625 14.175781 23.855469 14.75 25.5625 14.75 C 27.230469 14.75 28.550781 14.171875 29.84375 13.6875 C 31.136719 13.203125 32.425781 12.78125 34.34375 12.78125 C 36.847656 12.78125 39.554688 14.082031 41.6875 16.34375 C 38.273438 18.753906 36.675781 22.511719 37 26.15625 C 37.324219 29.839844 39.542969 33.335938 43.1875 35.15625 C 42.398438 36.875 41.878906 38.011719 40.71875 39.78125 C 39.761719 41.238281 38.625 42.832031 37.375 44.03125 C 36.125 45.230469 34.800781 45.988281 33.46875 46 C 32.183594 46.011719 31.453125 45.628906 30.34375 45.125 C 29.234375 44.621094 27.800781 44.042969 25.59375 44.0625 C 23.390625 44.074219 21.9375 44.628906 20.8125 45.125 C 19.6875 45.621094 18.949219 46.011719 17.65625 46 C 16.289063 45.988281 15.019531 45.324219 13.8125 44.21875 C 12.605469 43.113281 11.515625 41.605469 10.5625 40.15625 C 5.3125 32.15625 4.890625 22.757813 7.90625 18.125 C 10.117188 14.722656 13.628906 12.78125 16.75 12.78125 Z"></path>
                    </svg>
                    <span>Sign in with Apple</span>
                </button>

            </div>
        </div>
    );
}

export default Login;
