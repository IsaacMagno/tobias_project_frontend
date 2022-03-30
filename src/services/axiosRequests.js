import axios from 'axios';


export const getFiles = async () => {
  const allFiles = await axios.get("https://tobias-project-db.herokuapp.com/uploads")
    .then((o) => o.data);
  return allFiles;
};

export const getStats = async () => {
  const allStats = await axios.get("https://tobias-project-db.herokuapp.com/")
    .then((o) => o.data.champions);
  return allStats;
};
