"use client";

import { FaUser, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  useEffect(() => {
    const getProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    getProvider();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width="30"
          height="30"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden mt-4">
  {session?.user ? (
    <div className="flex gap-3 md:gap-5">
      <Link href="/create-prompt" className="flex items-center gap-2 px-4  bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out">
        <FaPlusCircle />
        Create Post
      </Link>
      <button onClick={signOut} className="flex items-center gap-2 px-4  border border-gray-500 text-gray-500 rounded hover:bg-gray-100 transition-colors duration-300 ease-in-out">
        <FaSignOutAlt />
        Sign Out
      </button>
      <Link href="/profile">
        <Image
          src={session?.user?.image}
          width={37}
          height={37}
          className="rounded-full"
        />
      </Link>
    </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="google_btn"
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                >
                  <img
                    src="/assets/icons/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              width="30"
              height="30"
              className="object-contain cursor-pointer rounded-full"
              alt="profile"
              onClick={() => {
                setToggleMenu((prev) => !prev);
              }}
            />
            {toggleMenu && (
              <div className="absolute right-0 mt-8 w-48 bg-white border rounded shadow-xl">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white flex items-center gap-2"
                  onClick={() => setToggleMenu(false)}
                >
                  <FaUser />
                  My Profile
                </a>
                <a
                  href="/create-prompt"
                  className=" px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white flex items-center gap-2"
                  onClick={() => setToggleMenu(false)}
                >
                  <FaPlusCircle />
                  Create Prompt
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setToggleMenu(false);
                    signOut();
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded shadow text-sm text-gray-700 hover:shadow-md transition-shadow duration-300 ease-in-out"
                >
                  <img
                    src="/assets/icons/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
