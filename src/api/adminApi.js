import api from "./axios";

export const getDashboardStats = async () => {
  const response = await api.get("/api/admin/dashboard");

  return response.data;
};

export const getUsers = async (params = {}) => {
  const response = await api.get("/api/admin/users", {
    params,
  });

  return response.data;
};

export const getStores = async () => {
  const response = await api.get("/api/admin/stores");

  return response.data;
};

export const createUser = async (payload) => {
  const response = await api.post("/api/admin/users", payload);

  return response.data;
};

export const createStore = async (payload) => {
  const response = await api.post("/api/admin/stores", payload);

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/api/admin/users/${id}`);

  return response.data;
};
