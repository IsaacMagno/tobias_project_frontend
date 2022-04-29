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

export const getPhrases = async () => {
  const phrase = await axios.get(`${BASE_URL}/phrases`).then((o) => o.data);

  return phrase;
};

export const addEvent = async (newEvent, id) => {
  const event = await axios.post(`${BASE_URL}/calendars/${id}`, { newEvent });

  return event;
};

export const getPractices = async (id) => {
  const AllPractices = await axios.get(`${BASE_URL}/practice/${id}`);

  return AllPractices;
};
