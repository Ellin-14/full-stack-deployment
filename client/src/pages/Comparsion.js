import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarMenu from "../layout/Sidebar";



export function ComparePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialPolicies = location.state?.selectedPolicies || [];
  const [selectedPolicies, setSelectedPolicies] = useState(initialPolicies);

  // Redirect if accessed directly or less than 2 policies
  useEffect(() => {
    if (!initialPolicies || initialPolicies.length < 2) {
      navigate("/", {
        replace: true,
        state: { message: "Please select at least 2 policies to compare" },
      });
    }
  }, [initialPolicies, navigate]);

  if (!selectedPolicies || selectedPolicies.length < 2) return null;

  const handleRemovePolicy = (policyId) => {
    const updated = selectedPolicies.filter((p) => p.id !== policyId);
    setSelectedPolicies(updated);

    if (updated.length < 2) {
      navigate("/", {
        replace: true,
        state: { message: "Please select at least 2 policies to compare" },
      });
    }
  };

  const comparisonKeys = [
    "Policy Name",
    "Policy Type",
    "Policy Number",
    "Coverage Amount",
    "Payment Frequency",
  ];

  const renderValue = (policy, key) => {
    switch (key) {
      case "Policy Name":
        return policy.title;
      case "Policy Type":
        return policy.policy_type;
      case "Policy Number":
        return policy.policy_number;
      case "Coverage Amount":
        return policy.coverage_amount || "-";
      case "Payment Frequency":
        return policy.payment_frequency || "-";
      default:
        return "-";
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-[260px]">
        <SidebarMenu />
      </div>
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Compare Policies
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Feature</th>
                {selectedPolicies.map((policy) => (
                  <th key={policy.id} className="px-4 py-3 text-left">
                    {policy.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {comparisonKeys.map((key) => (
                <tr key={key} className="border-b last:border-b-0">
                  <td className="px-4 py-3 font-semibold bg-gray-50">{key}</td>
                  {selectedPolicies.map((policy) => (
                    <td key={policy.id + key} className="px-4 py-3">
                      {renderValue(policy, key)}
                    </td>
                  ))}
                </tr>
              ))}

              <tr>
                <td className="px-4 py-3 font-semibold bg-gray-50">Actions</td>
                {selectedPolicies.map((policy) => (
                  <td key={policy.id} className="px-4 py-3">
                    <button
                      onClick={() => handleRemovePolicy(policy.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md"
                    >
                      Remove
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/policycatalog")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Back to Catalog
          </button>
        </div>
      </main>
    </div>
  );
}
export default ComparePage;
