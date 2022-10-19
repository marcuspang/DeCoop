import {
  ArrowsRightLeftIcon,
  ChartPieIcon,
  CheckBadgeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useAccount } from "@web3modal/react";
import Link from "next/link";
import { useRouter } from "next/router";

const pages = (address?: string) => [
  {
    name: "View Funds",
    href: "/fund",
    requiresLogIn: true,
    desktopIcon: <ChartPieIcon width={28} height={28} />,
    mobileIcon: <ChartPieIcon width={20} height={20} />,
  },
  {
    name: "Profile",
    href: "/profile/" + address,
    requiresLogIn: true,
    desktopIcon: <UserCircleIcon width={28} height={28} />,
    mobileIcon: <UserCircleIcon width={20} height={20} />,
  },
  {
    name: "Lend/Borrow",
    href: "/trade",
    requiresLogIn: false,
    desktopIcon: <ArrowsRightLeftIcon width={24} height={24} />,
    mobileIcon: <ArrowsRightLeftIcon width={20} height={20} />,
  },
  {
    name: "Repay",
    href: "/repay",
    requiresLogIn: false,
    desktopIcon: <CheckBadgeIcon width={28} height={28} />,
    mobileIcon: <CheckBadgeIcon width={20} height={20} />,
  },
];

const Sidebar = () => {
  const { address } = useAccount();
  const router = useRouter();

  return (
    <aside
      className={`inline-flex mr-4 ${router.pathname === "/" ? "hidden" : ""}`}
      aria-label="Sidebar"
    >
      <div className="w-64 hidden min-h-screen lg:inline-block overflow-y-auto py-4 px-3 ml-4 mt-3 rounded-xl header-background shadow">
        <ul className="space-y-2">
          {pages(address).map((link) => (
            <li key={link.name}>
              <Link href={link.href} passHref>
                <a
                  className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white element-background transition-colors ${
                    router.asPath.startsWith(link.href)
                      ? "bg-gray-100 dark:bg-slate-600"
                      : ""
                  }
                  ${
                    link.requiresLogIn && address === "cursor-default "
                      ? ""
                      : ""
                  }
                  `}
                >
                  {link.desktopIcon}
                  <span className="ml-3">{link.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:hidden mt-3 mb-3">
        <ul className="flex justify-center w-full items-center flex-wrap">
          {pages(address).map((link) => (
            <li key={link.name}>
              <Link href={link.href} passHref>
                <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  {link.mobileIcon}
                  <span className="ml-3">{link.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
