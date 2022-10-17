import { useQuery } from "@tanstack/react-query";
import { CommunityEvents } from "../pages/api/events";

const fetchCommunityEvents = (
  communityAddress: string,
  walletAddress: string
) => {
  return fetch(
    "/api/events?" +
      new URLSearchParams({
        community: communityAddress,
        address: walletAddress,
      })
  ).then((res) => res.json() as Promise<CommunityEvents>);
};

const useEvents = (communityAddress: string, walletAddress?: string) => {
  return useQuery(
    ["communityEvents", communityAddress, walletAddress],
    () => fetchCommunityEvents(communityAddress, walletAddress),
    { enabled: communityAddress !== "" }
  );
};

export default useEvents;
