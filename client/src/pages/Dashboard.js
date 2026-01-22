import { useEffect, useState } from "react";


import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import PageContainer from "../layout/PageContainer";
import StatCard from "../components/Dashboard/StatCard";


import PolicyCard from "../components/Dashboard/PolicyCard";
import RecommendationCard from "../components/Dashboard/RecommendationCard";
import ClaimsChart from "../components/Dashboard/ClaimsChart";
import RecentClaimsTable from "../components/Dashboard/RecentClaimsTable";



import {
  getDashboardSummary,
  getUserPolicies,
  getRecommendations,
  getClaimsOverview,
} from "../features/authentication/dashboard/services/dashboardApi";

const Dashboard = () => {

  const [summary, setSummary] = useState({
    active_policies: 0,
    pending_claims: 0,
    recommendations: 0,
    total_premium: 0,
  });

  const [policies, setPolicies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [claimsData, setClaimsData] = useState({
    status_breakdown: {
      approved: 0,
      pending: 0,
      rejected: 0,
    },
    recent_claims: [],
  });

  const [loading, setLoading] = useState(true);

  const [refreshKey, setRefreshKey] = useState(0);

useEffect(() => {
  const key = localStorage.getItem("notify_refresh");
  if (key) setRefreshKey(key);
}, []);


 
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const summaryRes = await getDashboardSummary();
        const policiesRes = await getUserPolicies();
        const recommendationsRes = await getRecommendations();
        const claimsRes = await getClaimsOverview();

        setSummary(summaryRes.data);
        setPolicies(policiesRes.data);
        setRecommendations(recommendationsRes.data);
        setClaimsData(claimsRes.data);
      } catch (error) {
        console.error("Dashboard load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

     
      <div className="flex-1 flex flex-col">
        <Navbar refreshKey={refreshKey} />


        <PageContainer>
          <h1 className="text-2xl font-semibold mb-6">
            Welcome, <span className="font-bold">User Name</span>
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Active Policies"
              value={summary.active_policies}
              subtitle="Increased by 2 from last month"
            />
            <StatCard
              title="Pending Claims"
              value={summary.pending_claims}
              subtitle="1 new claim this week"
            />
            <StatCard
              title="Recommendations"
              value={`${summary.recommendations} new`}
              subtitle="Personalized for you"
            />
            <StatCard
              title="Total Premium"
              value={`$${summary.total_premium}`}
              subtitle="Annual coverage"
            />
          </div>

        
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">
              My Policies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {policies.map((policy) => (
                <PolicyCard
                  key={policy.policy_no}
                  policy={policy}
                />
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Recommendations
            </h2>

            <div className="space-y-4">
              {recommendations.map((item) => (
                <RecommendationCard
                  key={item.id}
                  data={item}
                />
              ))}
            </div>
          </section>

          
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Claims Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ClaimsChart
                data={claimsData.status_breakdown}
              />
              <RecentClaimsTable
                claims={claimsData.recent_claims}
              />
            </div>
          </section>
        </PageContainer>
      </div>
    </div>
  );
};

export default Dashboard;
