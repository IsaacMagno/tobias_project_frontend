import axios from "axios";
import actualChampion from "../../functions/actualChampion";
import { BASE_URL } from "../../services/axiosRequests";

const statusUpdate = async (nameStat, value, id, reRender) => {
  const update = await axios
    .put(`${BASE_URL}/activities/${id}`, {
      [nameStat]: value,
    })
    .then(() => axios.get(BASE_URL))
    .then((o) => o.data.champions);

  const championUpdated = actualChampion(update, id);

  sessionStorage.setItem("champion", JSON.stringify(championUpdated));
  reRender(true);
};

export default statusUpdate;
