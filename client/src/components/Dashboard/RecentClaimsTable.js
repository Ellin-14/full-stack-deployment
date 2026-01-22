const statusStyles = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
};

const RecentClaimsTable = ({ claims }) => {
  if (!claims || claims.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-6 text-gray-500">
        No recent claims found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h3 className="font-semibold text-gray-800 mb-4">
        Recent Claims
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2">Claim No</th>
              <th className="pb-2">Type</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {claims.map((claim) => (
              <tr
                key={claim.claim_no}
                className="border-b last:border-none"
              >
                <td className="py-3 font-medium text-gray-800">
                  {claim.claim_no}
                </td>
                <td className="py-3">{claim.type}</td>
                <td className="py-3">{claim.date}</td>
                <td className="py-3">${claim.amount}</td>
                <td className="py-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      statusStyles[claim.status]
                    }`}
                  >
                    {claim.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentClaimsTable;
