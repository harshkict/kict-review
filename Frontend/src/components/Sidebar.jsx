import { Link, useLocation } from "react-router-dom";
import logo from "../assets/react.svg";
// import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      // 1024px is the lg breakpoint
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-30
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-gray-800 text-white
      `}
      >
        <div className="p-4">
          <div className="flex justify-between mb-8 items-center">
            
            <h1 className="text-xl font-bold">Review Manager</h1>
          </div>
          <nav className="space-y-2">
            <Link
              to="/dash/add"
              onClick={closeSidebar}
              className={`block p-3 rounded ${
                location.pathname === "/add"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              Add Business Review
            </Link>
            <Link
              to="/dash/edit"
              onClick={closeSidebar}
              className={`block p-3 rounded ${
                location.pathname === "/edit"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              All Business
            </Link>
            <Link
              to="/"
              onClick={closeSidebar}
              className={`block p-3 rounded ${
                location.pathname === "/login"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              Logout
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
