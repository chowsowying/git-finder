import axios from "axios";

const BASE_URL = "https://api.github.com";

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`);

  return data;
};
