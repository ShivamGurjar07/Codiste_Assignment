import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:1010/api", 
});

export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (userData) => API.post("/users/login", userData);

export const fetchEntries = (token) =>
  API.get("/travel", { headers: { Authorization: `Bearer ${token}` } });

export const updateEntry = (id, entry, token) =>
  API.put(`/travel/${id}`, entry, { headers: { Authorization: `Bearer ${token}` } });

export const addEntry = (entry, token) =>
  API.post("/travel", entry, { headers: { Authorization: `Bearer ${token}` } });

export const deleteEntry = (id, token) =>
  API.delete(`/travel/${id}`, { headers: { Authorization: `Bearer ${token}` } });
