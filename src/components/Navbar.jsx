import { LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useUserStore();

  return (
    <header className='fixed top-0 left-0 w-full bg-gray-900 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800 dark:border-emerald-800 light:bg-white light:bg-opacity-90 light:border-emerald-200'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex flex-wrap justify-between items-center'>
          <Link to='/' className='text-2xl font-bold text-emerald-400 dark:text-emerald-400 light:text-emerald-600 items-center space-x-2 flex'>
            FALLON
          </Link>
          <nav className='flex flex-wrap items-center gap-4'>
            <Link
              to={"/"}
              className='text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-emerald-400 dark:hover:text-emerald-400 light:hover:text-emerald-600 transition duration-300 ease-in-out'
            >
              Home
            </Link>
            
            <ThemeToggle />
            
            {user ? (
              <>
                <Link
                  to={"/dashboard"}
                  className='text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-emerald-400 dark:hover:text-emerald-400 light:hover:text-emerald-600 transition duration-300 ease-in-out flex items-center'
                >
                  <LayoutDashboard size={18} className="mr-2" />
                  Dashboard
                </Link>
                <button
                  className='bg-gray-700 dark:bg-gray-700 light:bg-gray-200 hover:bg-gray-600 dark:hover:bg-gray-600 light:hover:bg-gray-300 text-white dark:text-white light:text-gray-800 py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'
                  onClick={logout}
                >
                  <LogOut size={18} />
                  <span className='ml-2'>Log Out</span>
                </button>
              </>
            ) : (
              <Link
                to={"/login"}
                className='bg-gray-700 dark:bg-gray-700 light:bg-gray-200 hover:bg-gray-600 dark:hover:bg-gray-600 light:hover:bg-gray-300 text-white dark:text-white light:text-gray-800 py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'
              >
                <LogIn className='mr-2' size={18} />
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;