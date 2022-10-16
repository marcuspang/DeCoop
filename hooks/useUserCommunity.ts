import { useQuery } from "@tanstack/react-query";
import { Community } from "../pages/api/communities";

const fetchUserCommunity = (address: string) => {
  return fetch("/api/communities?address=" + address).then(
    (res) => res.json() as Promise<Pick<Community, "address" | "name">[]>
  );
};

const useUserCommunity = (address: string) => {
  return useQuery(
    ["userCommunities", address],
    () => fetchUserCommunity(address),
    { enabled: address !== "" }
  );
};

export default useUserCommunity;
