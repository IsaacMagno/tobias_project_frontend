import axios from "axios";
import actualChampion from "../../functions/actualChampion";
import {
  updateDaystreak,
  updateChampionActivities,
  updateChampionExp,
} from "../../services/axiosRequests";

const expBase = {
  kmRun: 200,
  jumpRope: 0.5,
  kmBike: 100,
  upperLimb: 2,
  abs: 2,
  lowerLimb: 2,
  meals: 50,
  drinks: 5,
  sleep: 1.5,
  study: 100,
  meditation: 1000,
  reading: 50,
};

const statusUpdate = async (nameStat, value, id) => {
  const updatedStats = await updateChampionActivities(nameStat, value, id);
  const championExp = expBase[nameStat] * value;

  await updateDaystreak(id);
  await updateChampionExp(id, championExp);

  const championUpdated = actualChampion(updatedStats, id);

  return championUpdated;
};

export default statusUpdate;
