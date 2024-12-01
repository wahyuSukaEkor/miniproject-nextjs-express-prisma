'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import InputSearch from '../_components/search-bar';
import { CircleUser, MenuIcon } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ProfileOptions from '@/components/shared/profile-options';

interface INavbarDesktopProps {}

const NavbarDesktop: React.FunctionComponent<INavbarDesktopProps> = (props) => {
  const router = useRouter();
  const [token, setToken] = React.useState<string | undefined>();
  const adminToken = Cookies.get('admin-tkn');
  const userToken = Cookies.get('user-tkn');

  React.useEffect(() => {
    setToken(adminToken ?? userToken);
  }, [adminToken, userToken]);

  const handleSignOut = () => {
    Cookies.remove('user-tkn');
    Cookies.remove('admin-tkn');
    router.push('/sign-in');
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full border-b border-gray-700 bg-black text-white">
      {/* Desktop Navbar */}
      <section className="hidden md:flex h-[80px] w-full items-center justify-between px-6 lg:px-16">
        <div className="flex items-center space-x-4">
          <Link href={`/`}>
            <Image
              className="h-fit w-full"
              src="/images/logo.png"
              width={90}
              height={30}
              alt="Logo"
            />
          </Link>
          <InputSearch />
        </div>
        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full text-white hover:bg-gray-800"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-900">
                <ProfileOptions />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href={`/sign-in`}>
                <Button
                  className="h-[40px] w-[78px] border border-gray-600 bg-black text-white hover:bg-gray-700"
                  type="button"
                >
                  Sign In
                </Button>
              </Link>
              <Link href={`/sign-up`}>
                <Button
                  className="h-[40px] w-[78px] border border-gray-600 bg-black text-white hover:bg-gray-700"
                  type="button"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Mobile Navbar */}
      <section className="flex h-[80px] w-full items-center justify-between px-4 md:hidden bg-black">
        <Link href={`/`}>
          <Image
            className="h-fit w-full"
            src="/images/logo.png"
            width={90}
            height={30}
            alt="Logo"
          />
        </Link>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded={isOpen}
            aria-label="Menu"
          >
            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
          </button>
          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="flex flex-col items-start p-4 space-y-2">
                {token ? (
                  <>
                    {adminToken && (
                      <Link
                        href={`/dashboard`}
                        className="block w-full text-sm text-gray-300 hover:bg-gray-800 py-2 px-4 rounded-md"
                      >
                        Dashboard
                      </Link>
                    )}
                    {userToken && (
                      <Link
                        href={`/my-event`}
                        className="block w-full text-sm text-gray-300 hover:bg-gray-800 py-2 px-4 rounded-md"
                      >
                        My Events
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left text-sm text-gray-300 hover:bg-gray-800 py-2 px-4 rounded-md"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/sign-in`}
                      className="block w-full text-sm text-gray-300 hover:bg-gray-800 py-2 px-4 rounded-md"
                    >
                      Sign In
                    </Link>
                    <Link
                      href={`/sign-up`}
                      className="block w-full text-sm text-gray-300 hover:bg-gray-800 py-2 px-4 rounded-md"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </nav>
  );
};

export default NavbarDesktop;
