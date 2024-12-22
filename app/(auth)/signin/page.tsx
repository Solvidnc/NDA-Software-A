'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [signupRedirect, setSignupRedirect] = useState<boolean>(false);
  const [homeRedirect, setHomeRedirect] = useState<boolean>(false);

  // Redirect based on authentication status
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/nda');
    }
  }, [isAuthenticated, router]);

  // Redirect to signup
  useEffect(() => {
    if (signupRedirect) {
      router.push('/signup');
    }
  }, [signupRedirect, router]);

  // Redirect to home
  useEffect(() => {
    if (homeRedirect) {
      router.push('/');
    }
  }, [homeRedirect, router]);

  const handleSignIn = () => {
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    const userData = JSON.parse(localStorage.getItem('userdata') || '[]');
    if (!userData.length) {
      alert("No users found. Please sign up.");
      setIsAuthenticated(false);
      return;
    }

    const user = userData.find((user: { email: string; password: string }) => user.email === email);

    if (!user) {
      alert('You are an unregistered user. Please sign up.');
      setIsAuthenticated(false);
    } else if (user.password !== password) {
      alert('Incorrect email or password.');
      setIsAuthenticated(false);
    } else {
      const sessionTime = new Date().getTime();
      localStorage.setItem("session", sessionTime.toString());
      setIsAuthenticated(true);
    }
  };

  const redirectToSignup = () => setSignupRedirect(true);
  const redirectToHome = () => setHomeRedirect(true);

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Sign in to your account</h1>
      </div>
      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input w-full py-2"
              type="email"
              placeholder="corybarker@email.com"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input w-full py-2"
              type="password"
              autoComplete="on"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleSignIn}
            className="btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]"
          >
            Sign In
          </button>
          <div className="mt-4 flex justify-around">
            <button
              onClick={redirectToSignup}
              className="btn w-40 bg-gradient-to-t from-green-600 to-green-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]"
            >
              Sign up
            </button>
            <button
              onClick={redirectToHome}
              className="btn w-40 bg-gradient-to-t from-slate-600 to-slate-400 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]"
            >
              Home
            </button>
          </div>
        </div>
      </form>
      {/* Bottom link */}
      <div className="mt-6 text-center">
        <Link className="text-sm text-gray-700 underline hover:no-underline" href="/reset-password">
          Forgot password?
        </Link>
      </div>
    </>
  );
}
