import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/dashboard";

export const getDashboardSummary = () => {
  return axios.get(`${API_BASE_URL}/summary`);
};

export const getUserPolicies = () => {
  return axios.get(`${API_BASE_URL}/policies`);
};

export const getRecommendations = () => {
  return axios.get(`${API_BASE_URL}/recommendations`);
};

export const getClaimsOverview = () => {
  return axios.get(`${API_BASE_URL}/claims`);
};
