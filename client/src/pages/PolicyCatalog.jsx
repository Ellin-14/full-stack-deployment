import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Header from "../components/Header";
import PolicyFilter from "../features/policies/components/PolicyFilter";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PolicyCatalog = () => {
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);
  const [policyTypes, setPolicyTypes] = useState([]);
  const [ranges, setRanges] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [messages, setMessages] = useState({});

  const [filters, setFilters] = useState({
    search: "",
    type: "",
    range: null,
  });

  useEffect(() => {
    if (!BASE_URL) {
      console.error("❌ BASE_URL is undefined. Check .env file");
      return;
    }

    fetch(`${BASE_URL}/policies`)
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setPolicies(data))
      .catch(console.error);

    fetch(`${BASE_URL}/policies/filters`)
      .then((res) => res.json())
      .then((data) => {
        setPolicyTypes(data.types || []);
        setRanges(data.ranges || []);
      })
      .catch(console.error);
  }, []);

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.title?.toLowerCase().includes(filters.search.toLowerCase());

    const matchesType =
      !filters.type || policy.policy_type === filters.type;

    const coverageAmount =
      Number(policy.coverage_amount?.replace(/,/g, "")) || 0;

    let matchesRange = true;
    if (filters.range) {
      const min = Number(filters.range.min);
      const max = Number(filters.range.max);
      matchesRange = coverageAmount >= min && coverageAmount <= max;
    }

    return matchesSearch && matchesType && matchesRange;
  });

  const handleCompareClick = (policy) => {
    const exists = compareList.find((p) => p.id === policy.id);

    if (exists) {
      setCompareList(compareList.filter((p) => p.id !== policy.id));
      return;
    }

    if (compareList.length >= 3) {
      alert("You can compare at most 3 policies.");
      return;
    }

    setCompareList([...compareList, policy]);
    setMessages((prev) => ({ ...prev, [policy.id]: "Added to compare" }));

    setTimeout(() => {
      setMessages((prev) => ({ ...prev, [policy.id]: null }));
    }, 2000);
  };

  const goToComparePage = () => {
    if (compareList.length < 2) {
      alert("Select at least 2 policies to compare.");
      return;
    }

    navigate("/compare", {
      state: { selectedPolicies: compareList, from: "/policies" },
    });
  };

  return (
    <div className="flex min-h-screen bg-[#0D99FF]">
      <Sidebar />

      <div className="flex-1 bg-gray-50">
        <Header />

        <div className="p-6">
          <PolicyFilter
            filters={filters}
            setFilters={setFilters}
            policyTypes={policyTypes}
            ranges={ranges}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {filteredPolicies.length === 0 && (
              <p className="text-gray-500">No policies found</p>
            )}

            {filteredPolicies.map((policy) => {
              const isSelected = compareList.some(
                (p) => p.id === policy.id
              );
              const message = messages[policy.id];

              return (
                <div
                  key={policy.id}
                  className="relative bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
                >
                  {/* Compare button */}
                  <div className="absolute top-2 right-2 flex flex-col items-center z-10">
                    <button
                      onClick={() => handleCompareClick(policy)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md text-white
                        ${
                          isSelected
                            ? "bg-green-500"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                      title={
                        isSelected
                          ? "Remove from compare"
                          : "Add to compare"
                      }
                    >
                      {isSelected ? "✓" : "+"}
                    </button>

                    {message && (
                      <span className="text-[10px] mt-1 bg-gray-800 text-white px-2 py-0.5 rounded">
                        {message}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold">
                    {policy.title}
                  </h3>
                  <p className="text-gray-500 mt-2">
                    {policy.policy_type}
                  </p>

                  <Link
                    to={`/policies/details/${policy.id}`}
                    className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compare widget */}
      {compareList.length > 0 && (
        <div
          className="fixed bottom-5 right-5 z-50 p-3 rounded-lg shadow-md bg-white transition-all duration-300"
          style={{ width: compareOpen ? "360px" : "150px" }}
        >
          <div
            className="flex justify-between cursor-pointer font-semibold"
            onClick={() => setCompareOpen(!compareOpen)}
          >
            Compare ({compareList.length})
            <span>{compareOpen ? "▼" : "▲"}</span>
          </div>

          {compareOpen && (
            <div className="mt-2 space-y-2">
              {compareList.map((policy) => (
                <div
                  key={policy.id}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <p className="text-sm font-semibold">
                    {policy.title}
                  </p>

                  <div className="flex justify-between mt-1">
                    <button
                      onClick={() =>
                        setCompareList(
                          compareList.filter(
                            (p) => p.id !== policy.id
                          )
                        )
                      }
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>

                    <button
                      disabled
                      className="text-xs px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Selected
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={goToComparePage}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Compare Now
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PolicyCatalog;
