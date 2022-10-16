import NewFundForm from "../../components/Fund/NewFundForm";

const NewFundPage = () => {
  return (
    <div className="w-full lg:pl-0 px-4">
      <h1 className="pt-4 pb-2 font-bold text-4xl">Creating new fund</h1>
      <div className="bg-white rounded-md shadow px-4 mt-3">
        <NewFundForm />
      </div>
    </div>
  );
};

export default NewFundPage;
