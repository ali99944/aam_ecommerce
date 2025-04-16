'use client'

import AppConstants from "@/src/providers/constants/app_constants";
import axios from "axios";

export const useAxios = (
  contentType?: "aplication/json" | "multipart/form-data"
) => {
  return axios.create({
    baseURL: AppConstants.api_url,
    headers: {
      "Content-Type": contentType as string,
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
      accept: "application/json",
      lang: "en",
      // authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  });
};
