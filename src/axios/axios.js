import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api/";
axios.interceptors.request.use(function (config) {
  const accessToken = sessionStorage.getItem("accessToken");
  if (config.url !== "login" && config.url !== "register") {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});
