import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { newPractice } from "../services/axiosRequests";

const Practice = () => {
  const [file, setFile] = useState([]);
  const { id } = useParams();

  const handleChange = (files) => {
    setFile(files);
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await newPractice(config, formData, id);
    document.getElementById("file").value = null;
  };

  return (
    <div className='rounded p-2'>
      <form encType='multipart/form-data' className='text-gainsboro'>
        <label>
          <input
            type='file'
            className='btn btn-outline-gainsboro btn-sm'
            id='file'
            onChange={({ target }) => handleChange(target.files[0])}
          />
          <button
            type='button'
            className='btn btn-outline-dark-purple btn-sm mt-1'
            onClick={() => handleCreate()}
          >
            Enviar
          </button>
        </label>
      </form>
    </div>
  );
};

export default Practice;
