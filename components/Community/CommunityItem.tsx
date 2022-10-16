import Link from "next/link";

interface CommunityItemProps {
  address: string;
  name: string;
  baseURL: string;
}

const CommunityItem = ({ address, name, baseURL }: CommunityItemProps) => {
  return (
    <li className="text-lg">
      <span className="font-bold">{name} </span>
      <Link href={baseURL + address} passHref>
        <a className="link break-all">{address}</a>
      </Link>
    </li>
  );
};

export default CommunityItem;
