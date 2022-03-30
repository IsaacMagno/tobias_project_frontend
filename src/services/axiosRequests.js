import axios from 'axios';


export const getFiles = async () => {
  const allFiles = await axios.get("http://localhost:3003/uploads")
    .then((o) => o.data);
  return allFiles;
};

export const getStats = async () => {
  const allStats = await axios.get("http://localhost:3003/")
    .then((o) => o.data.champions);
  return allStats;
};
