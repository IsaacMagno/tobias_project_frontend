import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/axiosRequests";
import { selectChampion } from "../../Redux/reducers/championsSlice";
import { useSelector, useDispatch } from "react-redux";
import actualChampion from "../../functions/actualChampion";

const RenderFiles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { champions } = useSelector((state) => state.champions);
  console.log(champions);
  const championFiles = champions.map((champ) => champ.files);

  const selectChamp = (id) => {
    const champ = actualChampion(champions, id);
    dispatch(selectChampion(champ));
    return navigate(`/champion/${id}`);
  };

  return (
    <div className='container'>
      <div className='row'>
        {championFiles.map((file) => (
          <div className='col-4' key={file.image}>
            <img
              src={`${BASE_URL}/images/${file.image}`}
              alt={"Foto de um Campeão"}
              key={file.image}
              className='img-thumbnail mt-5'
              onClick={() => selectChamp(file.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderFiles;
