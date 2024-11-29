"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InputSearch from "../_components/search-bar";
import { CircleUser, MenuIcon, UserIcon } from "lucide-react";
import Cookies from "js-cookie";
import { MdManageAccounts } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileOptions from "@/components/shared/profile-options";
interface INavbarDesktopProps {}

const NavbarDesktop: React.FunctionComponent<INavbarDesktopProps> = (props) => {
  const router = useRouter();
  const [token, setToken] = React.useState<string | undefined>();
  const adminToken = Cookies.get("admin-tkn");
  const userToken = Cookies.get("user-tkn");

  React.useEffect(() => {
    setToken(adminToken ?? userToken);
  }, [adminToken, userToken]);

  const handleSignOut = () => {
    Cookies.remove("user-tkn"); // Hapus cookie saat sign out
    Cookies.remove("admin-tkn"); // Hapus cookie saat sign out
    router.push("/sign-in");
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="w-full border-b-2 border-gray-200 text-black">
      {/* Desktop Navbar */}
      <section className="hidden h-[80px] w-full md:block">
        <div className="mx-[168px] flex items-center justify-between pt-[20px]">
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
          <div className="relative flex items-center space-x-2">
            {token ? (
              <div className="group relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <CircleUser className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <ProfileOptions />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link href={`/sign-in`}>
                  <Button
                    className="mx-auto h-[40px] w-[78px] border border-gray-400 bg-white text-black hover:bg-[#53b253] hover:text-white"
                    type="button"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href={`/sign-up`}>
                  <Button
                    className="mx-auto h-[40px] w-[78px] border border-gray-400 bg-white text-black hover:bg-[#53b253] hover:text-white"
                    type="button"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Navbar */}
      <section className="flex h-[80px] w-full items-center justify-between px-4 md:hidden ">
        <Link href={`/`}>
          <Image
            className="h-fit w-full"
            src="/images/logo.png"
            width={90}
            height={30}
            alt=""
          />
        </Link>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded={isOpen}
            aria-label="Menu"
          >
            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
          </button>

          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="bg-white py-1">
                {token ? (
                  <>
                    {adminToken && (
                      <Link href={`/dashboard`} className="">
                        <span className="block px-4 py-2 text-sm text-gray-700">
                          Dashboard
                        </span>
                      </Link>
                    )}
                    {userToken && (
                      <Link href={`/my-event`} className="">
                        <span className="block px-4 py-2 text-sm text-gray-700">
                          Dashboard
                        </span>
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/sign-in`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign In
                    </Link>
                    <Link
                      href={`/sign-up`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
