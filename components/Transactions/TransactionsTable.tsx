const transactions = [
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: new Date(),
    method: "Buy",
    amount: "Any amount",
    actionBy: (
      <a
        href="#"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>
    ),
  },
];

const TransactionsTable = () => {
  return (
    <div className="overflow-x-auto relative shadow sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Transaction
            </th>
            <th scope="col" className="py-3 px-6">
              Date
            </th>
            <th scope="col" className="py-3 px-6">
              Method
            </th>
            <th scope="col" className="py-3 px-6">
              Amount
            </th>
            <th scope="col" className="py-3 px-6">
              Coin
            </th>
            <th scope="col" className="py-3 px-6">
              Action By
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={transaction.address}
            >
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                0x000123123
              </th>
              <td className="py-4 px-6">{new Date().getTime()}</td>
              <td className="py-4 px-6">Laptop</td>
              <td className="py-4 px-6">$2999</td>
              <td className="py-4 px-6">$2999</td>
              <td className="py-4 px-6 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
