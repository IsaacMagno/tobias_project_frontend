const stats = {
  strength: "Força",
  agility: "Agilidade",
  inteligence: "Inteligencia",
  vitality: "Vitalidade",
  wisdow: "Sabedoria",
};

const activities = {
  kmRun: "Km corridos",
  jumpRope: "Saltos de Corda",
  kmBike: "Km Pedalados",
  upperLimb: "Treino Superior",
  abs: "Treino Abdominal",
  lowerLimb: "Treino Inferior",
  meals: "Refeições Saudáveis",
  drinks: "Litros de Água",
  study: "Horas Estudando",
  meditation: "Horas Meditando",
  reading: "Horas Lendo",
};

const formatedData = (arr, type) => {
  // eslint-disable-next-line
  const formated = arr.map((elem) => {
    if (type === "stats") return (elem[0] = stats[elem[0]]);
    if (type === "activities") return (elem[0] = activities[elem[0]]);
  });

  return formated;
};

const cleanArray = (arr, type) => {
  const newArray = arr.filter(
    (elm) => elm[0] !== "champion_id" && elm[0] !== "id"
  );

  formatedData(newArray, type);

  return newArray;
};

export default cleanArray;
