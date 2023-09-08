import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

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

export const removeEvent = async (eventDate, id) => {
  const event = await axios.delete(`${BASE_URL}/calendars/${id}`, {
    data: eventDate,
  });

  return event;
};

export const getPractices = async (id) => {
  const AllPractices = await axios.get(`${BASE_URL}/practice/${id}`);

  return AllPractices;
};

export const newPractice = async (config, formData, id) => {
  const createPractice = await axios
    .post(`${BASE_URL}/practice/${id}`, formData, config)
    .then((o) => o.data);

  return createPractice;
};

export const championLogin = async (championData) => {
  const isValid = await axios
    .post(`${BASE_URL}/champion-login`, championData)
    .then((o) => o.data);

  return isValid;
};

export const createTask = async (taskData) => {
  const taskCreated = await axios
    .post(`${BASE_URL}/task`, taskData)
    .then((o) => o.data);

  return taskCreated;
};

export const readTask = async (id) => {
  const task = await axios.get(`${BASE_URL}/task/${id}`).then((o) => o.data);

  return task;
};

export const updateTask = async (id, taskData) => {
  const task = await axios
    .put(`${BASE_URL}/task/${id}`, taskData)
    .then((o) => o.data);

  return task;
};

export const deleteTask = async (id) => {
  await axios.delete(`${BASE_URL}/task/${id}`);
};
