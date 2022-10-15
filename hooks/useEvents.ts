import { useQuery } from "@tanstack/react-query";
import { CommunityEvents } from "../pages/api/events";

const fetchCommunityEvents = (community: string, walletAddress: string) => {
  return fetch(
    "/api/events?" +
      new URLSearchParams({
        community,
        address: walletAddress,
      })
  ).then((res) => res.json() as Promise<CommunityEvents>);
};

const useEvents = (community: string, walletAddress?: string) => {
  return useQuery(
    ["communityEvents", community, walletAddress],
    () => fetchCommunityEvents(community, walletAddress),
    { enabled: community !== "" }
  );
};

export default useEvents;
