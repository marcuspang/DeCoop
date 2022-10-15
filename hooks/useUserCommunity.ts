import { useQuery } from "@tanstack/react-query";

const fetchUserCommunity = (address: string) => {
  return fetch("/api/communities?address=" + address).then(
    (res) => res.json() as Promise<string[]>
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
