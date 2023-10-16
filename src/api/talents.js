import axios from "axios";
import { API_URL } from "./data";

export const fetchTalents = async (token = "") => {
  const response = await axios({
    method: "GET",
    url: API_URL + "/talents",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const getTalent = async (id) => {
  const response = await axios.get(API_URL + "/talents/" + id);
  return response.data;
};

export const addTalents = async ({ data, token = "" }) => {
  const response = await axios({
    method: "POST",
    url: API_URL + "/talents",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  });
  return response.data;
};

export const addTalentImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios({
    method: "POST",
    url: API_URL + "/images",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  return response.data;
};

export const uploadTalentImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios({
    method: "POST",
    url: API_URL + "/images",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  return response.data;
};

export const updateTalent = async ({ id, data, token = "" }) => {
  const response = await axios({
    method: "PUT",
    url: API_URL + "/talents/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  });
  return response.data;
};

export const deleteTalent = async ({ id = "", token = "" }) => {
  const response = await axios({
    method: "DELETE",
    url: API_URL + "/talents/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};
