'use client'

import AppConstants from "@/src/constants/app_constants";
import { useAppSelector } from "@/src/redux/hook";
import axios from "axios";

export const useAxios = (
  contentType?: "aplication/json" | "multipart/form-data"
) => {
  const { token } = useAppSelector(state => state.auth)
  const { guest_cart_token } = useAppSelector(state => state.cart)

  return axios.create({
    baseURL: AppConstants.api_url,
    headers: {
      "Content-Type": contentType as string,
      accept: "application/json",
      lang: "en",
      authorization: `Bearer ${token}`,
      'X-Cart-Token': guest_cart_token,
      "Access-Control-Allow-Origin": "*",
    },
  });
};
