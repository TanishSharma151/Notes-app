import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };

  if (!loggedIn) {
    return (
      <div className="navbar bg-base-100 shadow-sm px-3 md:px-6">
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <a className="btn btn-ghost text-2xl md:text-3xl p-0 h-auto">
              Your personal notes app
            </a>
          </div>

          <div className="flex w-full md:w-auto gap-3">
            <button
              className="btn btn-soft btn-info flex-1 md:flex-none"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="btn btn-soft btn-success flex-1 md:flex-none"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 px-3 md:px-6 shadow-sm">

      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <a
            className="btn btn-ghost text-2xl md:text-3xl p-0 h-auto"
            onClick={() => navigate("/notes")}
          >
            Your personal notes app
          </a>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">

          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full md:w-64"
          />

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>

              <li>
                <a onClick={() => navigate("/notes/deleted")}>
                  Recently Deleted
                </a>
              </li>

              <li>
                <a onClick={handleLogout}>Logout ⏻</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
