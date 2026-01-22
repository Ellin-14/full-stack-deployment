import { Lightbulb } from "lucide-react";

const RecommendationCard = ({ data }) => {
  return (
    <div className="bg-white border rounded-xl p-5 flex items-start justify-between hover:shadow-sm transition">
      
      <div className="flex gap-4">
        <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
          <Lightbulb size={20} />
        </div>

        <div>
          <h4 className="font-semibold text-gray-800">
            {data.title}
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            {data.description}
          </p>
        </div>
      </div>

      <button className="text-blue-600 text-sm font-medium hover:underline">
        View
      </button>
    </div>
  );
};

export default RecommendationCard;
