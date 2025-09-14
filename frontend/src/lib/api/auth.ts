import { formData } from "@/app/(auth)/signup/page";
import { axiosInstance } from "@/utilities/axios";

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data.user;
};

export const signup = async (data: formData) => {
  const res = await axiosInstance.post("/auth/signup", data);
  const token: string = res.data?.token;
  if (token) {
    localStorage.setItem("token", token);
  }
  return res.data;
};
