import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/home/login", {
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
    <div className="flex justify-center items-center min-h-screen gap-10">
      {/* Left panel */}
      <div className="glass px-30 py-40 rounded-lg shadow-lg">
        <div className="text-3xl py-9">Welcome!</div>
        <p>Enter your credentials to login.</p>
        <p>If you are new, please click on Sign Up.</p>
        <button
          className="btn btn-soft btn-info my-5 py-2 shadow-lg rounded-lg w-32"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>

      {/* Login form */}
      <div className="p-15 shadow-lg rounded-lg">
        <div className="text-3xl">Login</div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email:</legend>
          <input
            type="email"
            className="input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="label">*Required</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password:</legend>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="label">*Required</p>
        </fieldset>
        <div className="flex flex-col gap-2 mt-4">
          <a
            href="http://www.google.com"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Forgot your password?
          </a>
          <div className="flex justify-center py-2">
            <button
              className="btn btn-success p-2 shadow-lg rounded-lg w-32"
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
