const actualChampion = (champions, id) => {
  const champ = champions.filter((champ) => champ.id === parseInt(id));

  return champ[0];
};

export default actualChampion;
