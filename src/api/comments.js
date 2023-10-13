import axios from "axios";
import { API_URL } from "./data";

export const fetchComments = async (post_id = "") => {
  const response = await axios.get(
    API_URL + "/comments" + (post_id !== "" ? "?post_id=" + post_id : "")
  );
  return response.data;
};

export const addComments = async ({ data, token = "" }) => {
  const response = await axios({
    method: "POST",
    url: API_URL + "/comments",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  });
  return response.data;
};

export const deleteComment = async ({ id = "", token = "" }) => {
  const response = await axios({
    method: "DELETE",
    url: API_URL + "/comments/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};
