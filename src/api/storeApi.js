import api from "./axios";

export const getStores = async () => {
  const response = await api.get("/api/stores");

  return response.data;
};

export const getStoreById = async (id) => {
  const response = await api.get(`/api/stores/${id}`);

  return response.data;
};

export const submitRating = async (payload) => {
  const response = await api.post("/api/ratings", payload);

  return response.data;
};

export const updateRating = async (storeId, payload) => {
  const response = await api.put(`/api/ratings/${storeId}`, payload);

  return response.data;
};
