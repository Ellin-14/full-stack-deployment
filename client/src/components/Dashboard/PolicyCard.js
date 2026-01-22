import { ShieldCheck } from "lucide-react";

const PolicyCard = ({ policy }) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition">
     
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-blue-500" size={20} />
          <h3 className="font-semibold text-gray-800">
            {policy.type}
          </h3>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
          {policy.status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Policy No</span>
          <span className="font-medium text-gray-800">
            {policy.policy_no}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Premium</span>
          <span className="font-medium text-gray-800">
            ${policy.premium}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Expires On</span>
          <span className="font-medium text-gray-800">
            {policy.expires_on}
          </span>
        </div>
      </div>

      
      <button className="mt-5 w-full border border-blue-500 text-blue-500 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
        View Details
      </button>
    </div>
  );
};

export default PolicyCard;
