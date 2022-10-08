import Link from "next/link";
import { useState } from "react";
import Search from "./Search";
import { Wallet } from "./Wallet";

const NavBar = () => {
  const [menuState, setMenuState] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <nav className="bg-white border-b">
      <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto">
        <Link href={"/"} passHref>
          <a className="flex-none lg:flex-initial">Optimity</a>
        </Link>
        <Search search={search} setSearch={setSearch} />

        <div className="flex-1 flex items-center justify-between">
          <div
            className={`bg-white absolute z-20 top-16 left-0 border-b lg:static lg:block lg:border-none ${
              menuState ? "w-full p-4 border-t" : "w-80 hidden"
            }`}
          >
            <Wallet className="lg:hidden" />
          </div>
          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
            <Wallet className="hidden lg:block" />
            <button
              className="outline-none text-gray-400 block lg:hidden"
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
