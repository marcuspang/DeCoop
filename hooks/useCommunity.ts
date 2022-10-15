import { useQuery } from "@tanstack/react-query";
import { Community } from "../pages/api/communities";

const fetchCommunity = (address: string) => {
  if (address === "default") {
    return () => Promise.resolve(null);
  }
  return () =>
    fetch("/api/community?address=" + address).then(
      (res) => res.json() as Promise<Community>
    );
};

// if address is not specified, return all communities
const useCommunity = (address: string) => {
  return useQuery(["community", address], fetchCommunity(address), {
    enabled: address !== "",
  });
};

export default useCommunity;
