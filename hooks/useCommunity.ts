import { useQuery } from "@tanstack/react-query";

const fetchCommunity = (address: string) => {
  return () =>
    fetch("/api/communities?address=" + address).then((res) => res.json());
};

const useCommunity = ({ address }: { address?: string }) => {
  // if address is not specified, return all communities
  if (address === undefined) {
  }

  return useQuery(["community"], fetchCommunity(address));
};

export default useCommunity;
