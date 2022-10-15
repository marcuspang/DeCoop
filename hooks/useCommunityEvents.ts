import { useQuery } from "@tanstack/react-query";
import { CommunityEvents } from "../pages/api/events";
import useUserCommunity from "./useUserCommunity";

const fetchCommunityEvents = (community: string, walletAddress: string) => {
  return fetch(
    "/api/events?" +
      new URLSearchParams({
        community,
        address: walletAddress,
      })
  ).then((res) => res.json() as Promise<CommunityEvents>);
};

const useCommunityEvents = (community: string, walletAddress?: string) => {
  return useQuery(
    ["communityEvents", community, walletAddress],
    () => fetchCommunityEvents(community, walletAddress),
    { enabled: community !== "" }
  );
};

export default useCommunityEvents;
