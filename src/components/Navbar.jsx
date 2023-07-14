import { Link } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";

const Navbar = () => {
  const [showNav, setShowNav] = useState(null);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleNav = (e) => {
    e.preventDefault();
    setShowNav(!showNav);
  };
  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="self-center text-2xl font-semibold whitespace-nowrap"
        >
          Project Managment
        </Link>
        <div className="w-full md:block md:w-auto">
          <ul className="font-medium pt-0 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-2 md:mt-0 md:border-0 md:bg-white flex items-center">
            {!user && (
              <div className="hidden md:flex">
                <li>
                  <Link
                    to="/login"
                    className="text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 focus:outline-none"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                  >
                    Sign up
                  </Link>
                </li>
              </div>
            )}

            {user && (
              <>
                <li>
                  <button
                    onClick={logout}
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                  >
                    Log out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
