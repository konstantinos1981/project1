import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/dj-rest-auth",
  headers: {
    "Content-Type": "application/json",
  },
});

interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials) {
  const response = await api.post("/token/", credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    api.defaults.headers.common["Authorization"] =
      `Token ${response.data.token}`;
  }
  return response.data;
}
