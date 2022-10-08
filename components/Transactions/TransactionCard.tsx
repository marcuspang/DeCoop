interface TransactionCardProps {
  title: string;
  amount: number;
  latest?: string; // description of person who performed last transaction
}

const TransactionCard = ({ amount, title, latest }: TransactionCardProps) => {
  return (
    <div className="pt-4 px-4 pb-6 bg-white rounded shadow w-full m-2 mt-1">
      <h3 className="font-semibold text-xl text-gray-600 mb-2">{title}</h3>
      <span className="font-bold text-3xl">${amount}</span>
      <p className="text-blue-700">{latest}</p>
    </div>
  );
};

export default TransactionCard;
