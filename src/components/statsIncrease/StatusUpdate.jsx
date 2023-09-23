import axios from "axios";
import actualChampion from "../../functions/actualChampion";
import { BASE_URL } from "../../services/axiosRequests";

const statusUpdate = async (nameStat, value, id) => {
  const update = await axios
    .put(`${BASE_URL}/activities/${id}`, {
      [nameStat]: value,
    })
    .then(() => axios.get(`${BASE_URL}/champions`))
    .then((o) => o.data.champions);

  const championUpdated = actualChampion(update, id);

  return championUpdated;
};

export default statusUpdate;
