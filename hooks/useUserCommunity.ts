import { useQuery } from "@tanstack/react-query";

const fetchUserCommunity = (walletAddress: string) => {
  return fetch("/api/communities?wallet=" + walletAddress).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<string[]>;
  });
};

const useUserCommunity = (walletAddress: string) => {
  console.log(walletAddress);
  return useQuery(
    ["userCommunities", walletAddress],
    () => fetchUserCommunity(walletAddress),
    { enabled: walletAddress !== "" }
  );
};

export default useUserCommunity;
