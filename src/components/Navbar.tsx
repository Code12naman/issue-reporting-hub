
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, isAuthenticated, logout, isAuthority } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="fixit-container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-fixit-primary text-2xl font-bold">FixIt</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-fixit-primary px-3 py-2 rounded-md">
              Home
            </Link>
            
            {isAuthenticated && (
              <Link to="/dashboard" className="text-gray-700 hover:text-fixit-primary px-3 py-2 rounded-md">
                Dashboard
              </Link>
            )}

            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-fixit-primary text-fixit-primary hover:bg-fixit-primary hover:text-white">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-fixit-primary hover:bg-fixit-secondary text-white">
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-600">
                  Hello, {user?.name}
                  {isAuthority() && <span className="ml-1 text-xs text-fixit-primary">(Authority)</span>}
                </div>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-fixit-danger" 
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-fixit-primary hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-fixit-primary hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {!isAuthenticated ? (
              <div className="space-y-2 pt-2">
                <Link
                  to="/login"
                  className="block w-full px-3 py-2 text-center rounded-md text-fixit-primary border border-fixit-primary bg-white hover:bg-fixit-primary-light"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-3 py-2 text-center rounded-md text-white bg-fixit-primary hover:bg-fixit-secondary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-200">
                <div className="px-3 py-2 text-sm text-gray-600">
                  Hello, {user?.name}
                  {isAuthority() && <span className="ml-1 text-xs text-fixit-primary">(Authority)</span>}
                </div>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-fixit-danger hover:bg-gray-50"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
