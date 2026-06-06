import api from "./axios";

export const getOwnerDashboard = async (storeId) => {
  if (storeId) {
    const response = await api.get(`/api/owner/dashboard?storeId=${storeId}`);
    return response.data;
  }
};

export const changePassword = async (payload) => {
  const response = await api.post("/api/auth/change-password", payload);

  return response.data;
};
