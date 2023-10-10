import axios from "axios";
import { API_URL } from "./data";

export const fetchVideos = async () => {
  const response = await axios.get(API_URL + "/videos");
  return response.data;
};

export const getVideo = async (id) => {
  const response = await axios.get(API_URL + "/videos/" + id);
  return response.data;
};

export const addVideos = async ({ data, token = "" }) => {
  const response = await axios({
    method: "POST",
    url: API_URL + "/videos",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  });
  return response.data;
};

export const addVideoImage = async (file) => {
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

export const uploadVideoImage = async (file) => {
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

export const updateVideo = async ({ id, data, token = "" }) => {
  const response = await axios({
    method: "PUT",
    url: API_URL + "/videos/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  });
  return response.data;
};

export const deleteVideo = async ({ id = "", token = "" }) => {
  const response = await axios({
    method: "DELETE",
    url: API_URL + "/videos/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};
