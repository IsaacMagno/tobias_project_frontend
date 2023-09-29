import actualChampion from "../../functions/actualChampion";
import {
  updateDaystreak,
  updateChampionActivities,
  updateChampionExp,
} from "../../services/axiosRequests";

const expBase = {
  kmRun: 150,
  jumpRope: 0.5,
  kmBike: 50,
  upperLimb: 2,
  abs: 2,
  lowerLimb: 3.5,
  meals: 25,
  drinks: 5,
  sleep: 1.5,
  study: 200,
  meditation: 1000,
  reading: 300,
};

const statusUpdate = async (nameStat, value, id) => {
  const championExp = expBase[nameStat] * value;

  await updateDaystreak(id);
  await updateChampionExp(id, championExp);

  const updatedStats = await updateChampionActivities(nameStat, value, id);

  const championUpdated = actualChampion(updatedStats, id);

  return championUpdated;
};

export default statusUpdate;
