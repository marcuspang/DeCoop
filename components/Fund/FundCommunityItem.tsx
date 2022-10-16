import Link from "next/link";

interface FundCommunityItemProps {
  address: string;
  name: string;
  baseURL: string;
}

const FundCommunityItem = ({
  address,
  name,
  baseURL,
}: FundCommunityItemProps) => {
  return (
    <li className="text-lg">
      <span className="font-bold">{name} </span>
      <Link href={baseURL + address} passHref>
        <a className="link break-all">{address}</a>
      </Link>
    </li>
  );
};

export default FundCommunityItem;
