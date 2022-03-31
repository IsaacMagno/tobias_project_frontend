import { useNavigate } from "react-router-dom";
import actualChampion from "../../functions/actualChampion";

const RenderFiles = ({ files, champions }) => {
  const navigate = useNavigate();
  const URL = "https://tobias-project-db.herokuapp.com/images/";

  const selectChamp = (id) => {
    const championSelected = actualChampion(champions, id);
    window.sessionStorage.setItem("champion", JSON.stringify(championSelected));

    return navigate(`/champion/${id}`);
  };

  return (
    <div className='container'>
      <div className='row'>
        {files.map((file) => (
          <div className='col-4 bg-light'>
            <img
              src={URL + file.image}
              alt={file.id}
              key={file.id}
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
