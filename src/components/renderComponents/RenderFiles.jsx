import { useNavigate } from "react-router-dom";
import actualChampion from "../../functions/actualChampion";
import { BASE_URL } from "../../services/axiosRequests";

const RenderFiles = ({ files, champions }) => {
  const navigate = useNavigate();

  const selectChamp = (id) => {
    const championSelected = actualChampion(champions, id);
    window.sessionStorage.setItem("champion", JSON.stringify(championSelected));

    return navigate(`/champion/${id}`);
  };

  return (
    <div className='container'>
      <div className='row'>
        {files.map((file) => (
          <div className='col-4 bg-light' key={file.image}>
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
