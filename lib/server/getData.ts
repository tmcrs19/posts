import { BASE_URL } from "../config/constants";

export const getData = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    return null;
  }
};
