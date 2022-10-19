import Image from "next/image";
import Link from "next/link";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

const NavBar = () => {
  return (
    <nav className="header-background border-b-2 border-color shadow dark:border-b-1">
      <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto ">
        <Link href={"/"} passHref>
          <a className="flex font-bold items-center space-x-2 hover:opacity-70 transition-opacity dark:text-white">
            <Image src={"/logo.png"} alt="DeCoop Logo" width={30} height={30} />
            <span>DeCoop</span>
          </a>
        </Link>
        {/* <Search search={search} setSearch={setSearch} /> */}

        <DesktopNavBar />
        <MobileNavBar />
      </div>
    </nav>
  );
};

export default NavBar;
