const ClaimsChart = ({ data }) => {
  if (!data) return null;

  const total =
    data.approved + data.pending + data.rejected;

  const approvedPercent = Math.round(
    (data.approved / total) * 100
  );
  const pendingPercent = Math.round(
    (data.pending / total) * 100
  );
  // const rejectedPercent = 100 - approvedPercent - pendingPercent;

  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-6">
        Claim Status
      </h3>

      
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40 rounded-full">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(
                #22c55e 0% ${approvedPercent}%,
                #facc15 ${approvedPercent}% ${approvedPercent + pendingPercent}%,
                #ef4444 ${approvedPercent + pendingPercent}% 100%
              )`,
            }}
          ></div>

          <div className="absolute inset-5 bg-white rounded-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800">
                {total}
              </div>
              <div className="text-xs text-gray-500">
                Total Claims
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            Approved
          </div>
          <span>{data.approved}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            Pending
          </div>
          <span>{data.pending}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            Rejected
          </div>
          <span>{data.rejected}</span>
        </div>
      </div>
    </div>
  );
};

export default ClaimsChart;
