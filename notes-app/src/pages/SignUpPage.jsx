import React, { useState } from 'react';
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
      console.log("Sending signup data:", { name, email, password });
      const res = await fetch("http://localhost:8000/home/signup", {
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
    <div className="flex justify-center items-center min-h-screen gap-10">
      {/* Left panel */}
      <div className="glass px-20 py-30 rounded-lg shadow-lg max-w-screen">
        <h1 className="text-3xl font-bold mb-6">Welcome!</h1>
        <p className="mb-2">Enter your credentials to sign up.</p>
        <p className="text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Login here
          </button>
        </p>
      </div>

      {/* Signup form */}
      <div className="p-8 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6">Create an Account</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-full mt-4">
            Sign Up
          </button>
        </form>
      </div>

      {/* Sonner toaster */}
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default SignUpPage;
