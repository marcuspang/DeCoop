import { FundContribution } from "../../pages/fund/[address]";

interface FundCreditScoresProps {
  data: FundContribution[];
}

const creditScores = {
  Adithya: 100,
  Marcus: 89,
  Kasshif: 75,
  "Yong Kang": 100,
  Colin: 100,
};

const FundCreditScores = ({ data }: FundCreditScoresProps) => {
  return (
    <ul>
      {data.map((person) => (
        <li key={person.name}>
          {person.name}: {creditScores[person.name]}
        </li>
      ))}
    </ul>
  );
};

export default FundCreditScores;
