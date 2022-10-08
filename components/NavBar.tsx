import Link from "next/link";
import { useState } from "react";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";
import Search from "./Search";

const NavBar = () => {
  const [search, setSearch] = useState("");

  return (
    <nav className="bg-white border-b">
      <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto">
        <Link href={"/"} passHref>
          <a className="flex-none lg:flex-initial">Optimity</a>
        </Link>
        <Search search={search} setSearch={setSearch} />

        <DesktopNavBar />
        <MobileNavBar />
      </div>
    </nav>
  );
};

export default NavBar;
