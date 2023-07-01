import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:8000/api" });

API.interceptors.request.use(function (request) {
  const token = localStorage.getItem("access_token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

API.interceptors.response.use(function (response) {
  if (response.status === 401) {
    const token = localStorage.getItem("access_token");
    if (token) {
      API.post("/refresh").then(({ data }) => {
        localStorage.setItem("access_token", data.authorization.token);
        API.request(response.config);
      });
    }
  }
  return response;
});
