import axios from "axios";

import config from "../Config";

const axiosConfigurations = {
  baseURL: config.API_URL,
  transformResponse: [
    function (data) {
      return JSON.parse(data);
    },
  ],
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
};

export const get = async (url) => {
  const response = await axios.get(`${url}`, axiosConfigurations);
  console.log(response, "response");
  return response.data;
};

export const post = async (url, data = {}) => {
  const response = await axios.post(`${url}`, data, axiosConfigurations);
  return response.data;
};

export const put = async (url, data = {}) => {
  const response = await axios.put(`${url}`, data, axiosConfigurations);
  return response.data;
};

export const del = async (url) => {
  const response = await axios.delete(`${url}`, axiosConfigurations);
  return response.data;
};
