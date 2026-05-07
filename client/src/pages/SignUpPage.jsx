import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Toaster, toast } from 'sonner';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/home/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Signup successful! You can now login.");
        navigate("/login");
      } else {
        toast.error(data.message || "Something went wrong during signup");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full max-w-6xl items-stretch">

        {/* Left Panel */}
        <div className="glass lg:w-[40%] rounded-2xl shadow-xl p-8 md:p-12 flex flex-col justify-center border border-white/10 backdrop-blur-xl">

          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Welcome!
          </h1>

          <div className="space-y-3 text-sm md:text-base">
            <p>Enter your credentials to sign up.</p>

            <p className="text-gray-400">
              Already have an account?{" "}

              <button
                onClick={() => navigate("/login")}
                className="text-blue-500 hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <div className="lg:w-[60%] shadow-xl rounded-2xl p-8 md:p-12 border border-white/10 backdrop-blur-xl">

          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Create an Account
          </h2>

          <form
            className="flex flex-col gap-5 mt-8"
            onSubmit={handleSignUp}
          >

            <div>
              <label className="block mb-1 text-sm font-medium">
                Name
              </label>

              <input
                type="text"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-success/40"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-success/40"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-success/40"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-success/40"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-full mt-6 text-base"
            >
              Sign Up
            </button>

          </form>
        </div>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default SignUpPage;