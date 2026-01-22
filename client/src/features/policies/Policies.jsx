import { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../components/Header";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Policies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/policies/my-policies`)
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0D99FF]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-50">
        <Header />

        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-6">My Policies</h1>

          {policies.length === 0 ? (
            <p>No policies purchased yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {policies.map((policy) => (
                <div key={policy.id} className="bg-white p-6 rounded-xl shadow">
                  <h3 className="text-lg font-semibold">{policy.title}</h3>

                  <p className="text-gray-500 mt-2">{policy.policy_type}</p>

                  <p className="text-sm text-gray-600 mt-1">
                    Policy No: {policy.policy_number}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Policies;
