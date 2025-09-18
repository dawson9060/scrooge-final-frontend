import { cookies } from "next/headers";
import axiosInstance from "./axiosInstance";

export const fetchUserServer = async () => {
  const cookiesStore = await cookies();

  // TODO - replace referer with env variable
  const headers = {
    Referer: "http://localhost:3000",
    Cookie: cookiesStore.toString(),
    "X-XSRF-TOKEN": cookiesStore.get("XSRF-TOKEN")?.value as string,
  };

  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
      { headers }
    );

    console.log("FETCHED USER SERVER", response?.data);
    return response?.data?.user;
  } catch (err) {
    console.error("Error checking auth:", err);
    return null;
  }
};
