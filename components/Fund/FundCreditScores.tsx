import { FundContribution } from "../../pages/fund/[address]";

interface FundCreditScoresProps {
  data: FundContribution[];
}

const creditScores = {
  Adithya: 100,
  Marcus: 20,
  Kasshif: 75,
  "Yong Kang": 100,
  Colin: 49,
};

const FundCreditScores = ({ data }: FundCreditScoresProps) => {
  if (data.length === 0) {
    return <div>No credit scores found</div>;
  }

  return (
    <ul className="list-inside list-disc text-lg">
      {data.map((person) => {
        const score = creditScores[person.address];
        return (
          <li
            key={person.address}
            className={`pl-2 font-bold ${
              score > 50 ? `text-green-700` : `text-red-700`
            }`}
          >
            <span className="text-black-800">
              {person.address}: {score}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default FundCreditScores;
