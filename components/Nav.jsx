"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false)

  useEffect(() => {
    const getProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    getProviders();
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
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button onClick={signOut} className="outline_btn">
              {" "}
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
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
                <button onClick={() => signIn(provider.id)} key={provider.name}>
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width="30"
              height="30"
              className="object-contain"
              alt="profile"
              onClick={()=>{
                setToggleMenu((prev)=>!prev);
              }}
            />
            {toggleMenu && (
              <div className="dropdown">
                <Link
                 href="/profile"
                className="dropdown_link"
                onClick={()=>(setToggleMenu(false))}
                  >
                  My Profile
                </Link>

                <Link
                 href="/create-prompt"
                className="dropdown_link"
                onClick={()=>(setToggleMenu(false))}
                  >
                  Create Prompt
                </Link>
                <button
                type="button"
                onClick={()=>{
                  setToggleMenu(false);
                  signOut();
                }}
                className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
            
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button onClick={() => signIn(provider.id)} key={provider.name}>
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
