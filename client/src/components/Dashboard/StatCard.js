const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border hover:shadow-md transition">
      <div className="text-sm text-gray-500 mb-1">{title}</div>

      <div className="text-3xl font-bold text-gray-800 mb-2">
        {value}
      </div>

      {subtitle && (
        <div className="text-xs text-gray-400">
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default StatCard;
