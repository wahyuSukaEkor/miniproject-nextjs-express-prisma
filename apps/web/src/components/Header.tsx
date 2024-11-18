'use client';
import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link legacyBehavior href="/">
            <a>
              <img
                src="/image/logo.png"
                alt="Tiketakti"
                className="w-40 h-10"
              ></img>
            </a>
          </Link>

          <label className="input input-bordered flex items-center bg-white text-black">
            <input type="text" className="grow bg-white text-black placeholder-gray-400" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-6 w-6 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          <button
            className="block md:hidden text-gray-700"
            id="nav-bar"
            aria-label="Tombol Navigasi"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>

          {/* Navbar Desktop */}
          <ul className="hidden md:flex space-x-4">
            <li>
              <Link legacyBehavior href="/">
                <a
                  className="block text-gray-700 hover:text-blue-500"
                  onClick={toggleMenu}
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/registration">
                <a className="text-gray-700 hover:text-blue-500">Daftar</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/">
                <a className="text-gray-700 hover:text-blue-500">Masuk</a>
              </Link>
            </li>
          </ul>

          {/* Mobile Navbar */}
          {isOpen && (
            <ul className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md p-4 space-y-4">
              <li>
                <Link legacyBehavior href="/">
                  <a
                    className="block text-gray-700 hover:text-blue-500"
                    onClick={toggleMenu}
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/registration">
                  <a
                    className="block text-gray-700 hover:text-blue-500"
                    onClick={toggleMenu}
                  >
                    Daftar
                  </a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/">
                  <a
                    className="block text-gray-700 hover:text-blue-500"
                    onClick={toggleMenu}
                  >
                    Masuk
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
