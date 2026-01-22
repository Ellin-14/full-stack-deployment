import { useNavigate } from "react-router-dom";
const PageContainer = ({ children }) => {
  return (
    <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
      {children}
    </main>
  );
};

export default PageContainer;



export const InfoCard = () => {
  return (
    <div className="max-w-[1100px] mx-auto my-5 bg-blue-100 p-4 rounded font-sans">
      <h2 className="m-0 font-bold text-lg">Available Insurance Policies</h2>
      <p className="mt-1 text-sm text-red-900">
        Compare and choose the best policy
      </p>
    </div>
  );
};


export const PolicyCard = ({ policy, onCompareToggle, isSelected }) => {
  return (
    <div
      className={`max-w-[500px] mx-auto my-2 p-5 rounded-lg font-sans transition-shadow ${
        isSelected
          ? "bg-blue-200 shadow-[0_0_8px_2px_#1893ff]"
          : "bg-blue-100 shadow-md"
      }`}
    >
      <h3 className="m-0 font-semibold">{policy.provider_name}</h3>
      <p>
        <strong>Policy:</strong> {policy.title}
      </p>
      <p>
        <strong>Premium:</strong> ₹{policy.premium || "-"}
      </p>
      <p>
        <strong>Term:</strong> {policy.term_months} months
      </p>
      <p>
        <strong>Deductible:</strong> ₹{policy.deductible}
      </p>

      {policy.coverage && (
        <div>
          <strong>Coverage:</strong>
          <ul className="list-disc list-inside">
            {Object.entries(policy.coverage).map(([key, value]) => (
              <li key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {onCompareToggle && (
        <label className="text-sm flex items-center mt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onCompareToggle(policy)}
            className="mr-2"
          />
          Compare
        </label>
      )}
    </div>
  );
};


export function PolicyLandingCointainer() {
  const navigate = useNavigate();

  const categories = [
    { title: "Health", description: "Cashless hospitalization, 24/7 support" },
    { title: "Automobile", description: "Accident cover, theft protection" },
    { title: "Home", description: "Fire & theft, natural disasters" },
    { title: "Travel", description: "Trip cancellation, emergencies" },
    { title: "Children", description: "Education & future protection" },
  ];

  const handleViewDetails = (type) => {
    navigate(`/policies/${type.toLowerCase()}`);
  };

  return (
    <div className="max-w-[1100px] mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((item) => (
        <div
          key={item.title}
          className="bg-blue-200 p-6 rounded-xl shadow-md font-sans"
        >
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="mt-2">{item.description}</p>
          <button
            onClick={() => handleViewDetails(item.title)}
            className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
