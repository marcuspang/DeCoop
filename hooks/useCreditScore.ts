import { useQuery } from "@tanstack/react-query";

const fetchCreditScore = (address: string) => {
  return () =>
    fetch("/api/credit_score?address=" + address).then(
      (res) => res.json() as Promise<{ creditScore: number }>
    );
};

const useCreditScore = (address: string) => {
  return useQuery(["creditScore", address], fetchCreditScore(address), {
    enabled: address !== "",
  });
};

export default useCreditScore;
