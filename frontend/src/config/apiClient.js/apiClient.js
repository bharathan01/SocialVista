import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;

const options = {
  baseURL: VITE_BASE_URL,
  withCredentials: true,
};

export const API = axios.create(options);
