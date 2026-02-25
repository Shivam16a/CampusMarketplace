import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:6550/api/auth",
});

API.interceptors.request.use((req) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo?.token) {
    req.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return req;
});

export default API;