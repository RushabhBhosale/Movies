import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL!;
const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN!;

const headers = {
  Authorization: `Bearer ${TMDB_TOKEN}`,
};

export const fetchDataFromApi = async (url: string, params?: string) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.error("API Error:", err);
    return err;
  }
};
