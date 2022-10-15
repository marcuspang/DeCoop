import { useQuery } from "@tanstack/react-query";

const fetchUserCommunity = (walletAddress: string) => {
  return fetch("/api/communities?wallet=" + walletAddress).then(
    (res) => res.json() as Promise<string[]>
  );
};

const useUserCommunity = (walletAddress: string) => {
  return useQuery(
    ["userCommunities", walletAddress],
    () => fetchUserCommunity(walletAddress),
    { enabled: walletAddress !== "" }
  );
};

export default useUserCommunity;
