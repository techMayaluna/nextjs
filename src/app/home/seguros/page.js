import InsuranceList from "@/app/components/insurances/InsuranceList";

const segurosPage = () => {
  return (
    <div className="pb-36">
      <h2 className="pb-2 text-center">MIS SEGUROS</h2>
      <InsuranceList />
    </div>
  );
};

export default segurosPage;
