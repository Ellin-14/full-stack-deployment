import { useState } from "react";

const PremiumCalculator = () => {
  const [coverage, setCoverage] = useState(500000);
  const [premium, setPremium] = useState(null);

  const calculate = () => {
    const result = 300 + (coverage / 10000) * 10;
    setPremium(result);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        Premium Calculator
      </h2>

      <label className="text-sm text-gray-600">
        Coverage Amount
      </label>

      <input
        type="number"
        value={coverage}
        onChange={(e) => setCoverage(e.target.value)}
        className="w-full border border-gray-200 rounded px-3 py-2 mt-1"
      />

      <button
        onClick={calculate}
        className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700"
      >
        Calculate Premium
      </button>

      {premium && (
        <p className="mt-4 text-lg font-bold text-green-600">
          Estimated Premium: ₹{premium}
        </p>
      )}
    </div>
  );
};

export default PremiumCalculator;
