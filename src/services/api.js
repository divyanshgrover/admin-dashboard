import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Users API
export const getUsers = () => API.get("/users");
export const addUser = (user) => API.post("/users", user);
export const updateUser = (id, updatedUser) => API.put(`/users/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Roles API
export const getRoles = () => API.get("/roles");
export const addRole = (role) => API.post("/roles", role);
export const updateRole = (id, updatedRole) => API.put(`/roles/${id}`, updatedRole);
export const deleteRole = (id) => API.delete(`/roles/${id}`);
