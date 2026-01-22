import Header from "../components/Header";
import { useState } from "react";

const PremiumCalculator = () => {
  const [coverage, setCoverage] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [frequency, setFrequency] = useState("");
  const [premium, setPremium] = useState(null);

  const calculatePremium = () => {
    if (!coverage || !policyType || !frequency) {
      alert("Please fill all fields");
      return;
    }

    let coverageValue = Number(coverage);
    let basePremium = coverageValue * 0.01;

    if (policyType === "Health Insurance") basePremium += 500;
    if (policyType === "Travel Insurance") basePremium += 300;
    if (policyType === "Accident Insurance") basePremium += 200;
    if (policyType === "Life Insurance") basePremium += 400;

    if (frequency === "Monthly") basePremium /= 12;

    setPremium(Math.round(basePremium));
  };

  return (
    <>
      <Header />

      <div className="bg-gray-50 min-h-screen p-8">
        <h1 className="text-2xl font-semibold mb-6">
          Policy Premium Calculator
        </h1>

        <div className="bg-white p-6 rounded-xl shadow w-full md:w-1/2">
        
          <label className="block mb-2 font-medium">
            Coverage Amount (₹)
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter coverage amount"
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
          />

          
          <label className="block mb-2 font-medium">
            Policy Type
          </label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={policyType}
            onChange={(e) => setPolicyType(e.target.value)}
          >
            <option value="">Select policy type</option>
            <option value="Health Insurance">Health Insurance</option>
            <option value="Life Insurance">Life Insurance</option>
            <option value="Travel Insurance">Travel Insurance</option>
            <option value="Accident Insurance">Accident Insurance</option>
          </select>

          
          <label className="block mb-2 font-medium">
            Payment Frequency
          </label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="">Select frequency</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>

          
          <button
            onClick={calculatePremium}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Calculate Premium
          </button>

         
          {premium && (
            <div className="mt-6 text-lg font-semibold">
              Estimated Premium: ₹ {premium}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PremiumCalculator;
