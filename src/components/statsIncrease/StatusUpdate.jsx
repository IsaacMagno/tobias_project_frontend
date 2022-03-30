import axios from 'axios';
import actualChampion from '../../functions/actualChampion';

const statusUpdate = async (nameStat, value, id, reRender) => {
  const update = await axios.put(`http://localhost:3003/activities/${id}`, { [nameStat]: value } )
    .then(() => axios.get("http://localhost:3003/"))
    .then((o) => o.data.champions);

  const championUpdated =  actualChampion(update, id);

  sessionStorage.setItem("champion", JSON.stringify(championUpdated));
  reRender(true);
}

export default statusUpdate;
