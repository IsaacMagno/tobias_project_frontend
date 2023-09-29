import React, { useEffect, useState } from "react";

import {
  BASE_URL,
  updateChampionBio,
  getStats,
} from "../services/axiosRequests";

import { selectChampion } from "../Redux/reducers/championsSlice";

import NavSidebar from "../components/NavSidebar";
import Stats from "../components/Stats";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ReactComponent as EditIcon } from "../images/edit-svgrepo-com.svg";
import { ReactComponent as SaveIcon } from "../images/send-svgrepo-com.svg";

const ChampionPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [editModeEnable, setEditModeEnable] = useState(false);
  const [editBioText, setEditBioText] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const champions = useSelector((state) => state.champions);
  const { user } = useSelector((state) => state.user);

  const { selectedChampion } = champions;

  useEffect(() => {
    if (selectedChampion.length === 0) return navigate("/champions");

    setEditBioText(selectedChampion.biography);
  }, [selectedChampion]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsLargeScreen(mediaQuery.matches);

    const handleResize = () => setIsLargeScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleEditMode = async () => {
    if (editModeEnable) {
      await updateChampionBio(selectedChampion.id, editBioText);
      await getStats(selectedChampion.id).then((o) =>
        dispatch(selectChampion(o))
      );
    }

    setEditModeEnable(!editModeEnable);
  };

  return (
    <div className="bg-gray-0d0  flex flex-col justify-evenly md:grid md:grid-cols-5 gap-12">
      {isLargeScreen ? <NavSidebar /> : null}
      <div className="min-w-full col-span-3">
        <h1 className="text-center text-7xl mt-10 md:text-9xl font-extrabold opacity-40 md:opacity-30  text-white">
          {selectedChampion.name}
        </h1>
        {isLargeScreen ? (
          <div className="flex flex-row mt-16">
            <div className="">
              <img
                src={`${BASE_URL}/images/${selectedChampion.files.image}`}
                key={selectedChampion.files.image}
                alt={"Foto de um campeão"}
                className="opacity-50 grayscale rounded-l"
                style={{
                  minHeight: "40vh",
                  maxHeight: "50vh",
                  minWidth: "20vh",
                  maxWidth: "40vh",
                }}
              />
            </div>
            <div className="bg-gray-3b3 opacity-40 md:text-sm lg:text-xl font-light  rounded-r flex flex-col items-center flex-grow justify-between">
              {editModeEnable ? (
                <textarea
                  className="text-center text-xl font-medium m-auto  margin-0-auto textbox-sizes rounded p-5"
                  onChange={({ target: { value } }) => setEditBioText(value)}
                  rows={8}
                >
                  {selectedChampion.biography}
                </textarea>
              ) : (
                <p className="text-white text-center m-auto text-xl font-bold  margin-0-auto">
                  {selectedChampion.biography.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              )}
              {user.username === selectedChampion.username ? (
                <div className="flex justify-end  min-w-full">
                  <button
                    className="bg-white bg-opacity-50 hover:bg-opacity-100 p-2  rounded m-1"
                    onClick={() => handleEditMode()}
                  >
                    {!editModeEnable ? (
                      <EditIcon className="w-10 h-10" />
                    ) : (
                      <SaveIcon className="w-10 h-10" />
                    )}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="flex flex-col m-5">
            <div>
              <img
                src={`${BASE_URL}/images/${selectedChampion.files.image}`}
                key={selectedChampion.files.image}
                alt={"Foto de um campeão"}
                className="opacity-50 grayscale rounded-t"
              />
            </div>
            <div className="bg-gray-500 opacity-40 md:text-xl font-light text-center rounded-b flex items-center">
              <p className="m-2 text-white ">{selectedChampion.biography}</p>
            </div>
            {!isLargeScreen ? <Stats /> : null}
          </div>
        )}
      </div>
      {!isLargeScreen ? (
        <div className="mb-10">
          <NavSidebar />
        </div>
      ) : null}

      {isLargeScreen ? <Stats /> : null}
    </div>
  );
};

export default ChampionPage;
