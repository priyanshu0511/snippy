"use client";

import useAuthUser from "@/hooks/useAuthUser";

const Navbar = () => {
  const { authData } = useAuthUser();
  console.log(authData);

  return (
    <nav className="flex justify-between px-6 py-4 shadow h-16 items-center bg-gray-500">
      <h1 className="text-xl font-bold text-blue-300">Snippy</h1>
      {authData ? (
        <div className="flex items-center gap-2">
          <p className="text-white">Welcome, {authData.username}</p>
          <button className="bg-gray-800 text-white px-3 py-1 rounded">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <a href="/login" className="bg-gray-500 text-white px-4 py-2 rounded">
            Login
          </a>
          <a
            href="/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Register
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
