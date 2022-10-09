import {
  ArrowsRightLeftIcon,
  ChartPieIcon,
  CheckBadgeIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  {
    name: "View Funds",
    href: "/fund/default",
    desktopIcon: <ChartPieIcon width={28} height={28} />,
    mobileIcon: <ChartPieIcon width={20} height={20} />,
  },
  {
    name: "Profile",
    href: "/profile/default",
    desktopIcon: <UserCircleIcon width={28} height={28} />,
    mobileIcon: <UserCircleIcon width={20} height={20} />,
  },
  {
    name: "Lend/Borrow",
    href: "/",
    desktopIcon: <ArrowsRightLeftIcon width={24} height={24} />,
    mobileIcon: <ArrowsRightLeftIcon width={20} height={20} />,
    extraIcon: (
      <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
        3
      </span>
    ),
  },
  {
    name: "Repay",
    href: "/",
    desktopIcon: <CheckBadgeIcon width={28} height={28} />,
    mobileIcon: <CheckBadgeIcon width={20} height={20} />,
  },
];

const Sidebar = () => {
  const router = useRouter();
  return (
    <aside className="inline-flex" aria-label="Sidebar">
      <div className="w-64 hidden lg:inline-block overflow-y-auto py-4 px-3 ml-4 bg-white rounded-xl dark:bg-gray-800 shadow">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.href} passHref>
                <a
                  className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    router.asPath === link.href
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }`}
                >
                  {link.desktopIcon}
                  <span className="ml-3">{link.name}</span>
                  {link.extraIcon}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:hidden mt-3 mb-3">
        <ul className="flex justify-center w-full items-center flex-wrap">
          {links.map((link) => (
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
