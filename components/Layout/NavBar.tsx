import Image from "next/image";
import Link from "next/link";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

const NavBar = () => {
  // const [search, setSearch] = useState("");

  return (
    <nav className="bg-white border-b-2">
      <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto ">
        <Link href={"/"} passHref>
          <a className="flex font-bold items-center space-x-2 hover:opacity-70 transition-opacity">
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
