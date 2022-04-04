import axios from "axios";

// export const BASE_URL = "https://tobias-project-db.herokuapp.com";
export const BASE_URL = "http://localhost:3003";

export const getFiles = async () => {
  const allFiles = await axios.get(`${BASE_URL}/uploads`).then((o) => o.data);
  return allFiles;
};

export const getStats = async () => {
  const allStats = await axios.get(BASE_URL).then((o) => o.data.champions);
  return allStats;
};
