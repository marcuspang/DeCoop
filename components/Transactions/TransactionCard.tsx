const TransactionCard = () => {
  return (
    <div className="pt-4 px-4 pb-6 bg-white rounded shadow w-full m-2">
      <h3 className="font-semibold text-xl text-gray-600 mb-2">
        Current Balance
      </h3>
      <span className="font-bold text-3xl">$10,000</span>
      <p className="text-blue-700">by Marcus 3 days ago</p>
    </div>
  );
};

export default TransactionCard;
