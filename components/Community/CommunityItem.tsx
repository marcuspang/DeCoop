import Link from "next/link";

interface CommunityItemProps {
  address: string;
  baseURL: string;
}

const CommunityItem = ({ address, baseURL }: CommunityItemProps) => {
  return (
    <li>
      <Link href={baseURL + address} passHref>
        <a className="text-blue-600 dark:text-blue-500 hover:underline">
          {address}
        </a>
      </Link>
    </li>
  );
};

export default CommunityItem;
