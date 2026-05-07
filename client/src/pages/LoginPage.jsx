import { useNavigate } from "react-router-dom";
import { useState } from "react";


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/home/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token); // store JWT
        navigate("/notes"); // go to notes page
      } else {
        alert(data.message || "Invalid login");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full max-w-6xl items-center">

        {/* Left panel */}
        <div className="glass w-full lg:w-[40%] rounded-2xl shadow-xl p-8 md:p-10 min-h-500px flex flex-col justify-center">

          <div className="text-3xl md:text-4xl font-semibold mb-6">
            Welcome!
          </div>

          <div className="space-y-2 text-sm md:text-base">
            <p>Enter your credentials to login.</p>
            <p>If you are new, please click on Sign Up.</p>
          </div>

          <button
            className="btn btn-soft btn-info mt-6 w-full sm:w-40"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Login form */}
        <div className="w-full lg:w-[60%] shadow-xl rounded-2xl p-8 md:p-10 min-h-500px flex flex-col justify-center">

          <div className="text-3xl md:text-4xl font-semibold mb-6">
            Login
          </div>

          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Email:</legend>

            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="label">*Required</p>
          </fieldset>

          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Password:</legend>

            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="label">*Required</p>
          </fieldset>

          <div className="flex flex-col gap-4 mt-6">

            <a
              href="http://www.google.com"
              target="_blank"
              className="text-blue-500 hover:underline text-sm"
            >
              Forgot your password?
            </a>

            <button
              className="btn btn-success w-full sm:w-40 self-center"
              onClick={handleLogin}
            >
              Login
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
