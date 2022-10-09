import Link from "next/link";
import { Community as CommunityItem } from "../../pages/api/communities";

const CommunityItem = ({
  community,
  erc,
  ercName,
  fundBalance,
  name,
  baseURL,
}: CommunityItem & { baseURL: string }) => {
  return (
    <li>
      <Link href={baseURL + community + "?name="+name + "&balance=" + fundBalance} passHref>
        <a className="text-blue-600 dark:text-blue-500 hover:underline">
          {community}
        </a>
      </Link>
    </li>
  );
};

export default CommunityItem;
