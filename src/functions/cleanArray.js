const cleanArray = (arr) => {
  const newArray = arr.filter((elm) => elm[0] !== "champion_id" && elm[0] !== "id");
  return newArray;
};

export default cleanArray;
