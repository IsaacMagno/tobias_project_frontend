import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";

import NavSidebar from "../components/NavSidebar";
import Stats from "../components/Stats";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../Redux/reducers/userSlice";
import { setChampions } from "../Redux/reducers/championsSlice";

import {
  updateTask,
  getStats,
  createTask,
  deleteTask,
} from "../services/axiosRequests";

import trash from "../images/trash-icon-png-12.jpg";

const TaskPage = () => {
  const [taskName, setTaskName] = useState();
  const [taskGoal, setTaskGoal] = useState();
  const [taskType, setTaskType] = useState("Anual");
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [taskValue, setTaskValue] = useState({});
  const [taskId, setTaskId] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const champions = useSelector((state) => state.champions);

  if (user.length === undefined) {
    var { task } = user;
  }

  useEffect(() => {
    if (user.length !== undefined) return navigate("/");

    dispatch(setUser(champions.selectedChampion));
  }, [champions, user]);

  const handleUpdate = async () => {
    await getStats().then((o) => dispatch(setChampions(o)));
  };

  const handleChange = async (task, id, name) => {
    setTaskValue({ [name]: task });
    setTaskId(id);
  };

  const handleClick = async (id) => {
    if (window.confirm("Você quer mesmo excluir essa meta?")) {
      await handleDelete(id);
      alert.show("A meta foi excluida");
    }
  };

  const handleSubmit = async (name) => {
    await updateTask(taskId, { actual: taskValue[name] });

    handleUpdate();

    setTaskValue({ [name]: "" });
    setTaskId();
  };

  const handleCreate = async () => {
    await createTask({
      name: taskName,
      type: taskType,
      goal: taskGoal,
      champion_id: user.id,
    });

    handleUpdate();

    setTaskName("");
    setTaskGoal("");
  };

  const handleDelete = async (id) => {
    await deleteTask(id);

    handleUpdate();
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsLargeScreen(mediaQuery.matches);

    const handleResize = () => setIsLargeScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className=" bg-gray-0d0 md:grid md:grid-cols-5 gap-12 min-h-screen ">
      {isLargeScreen ? <NavSidebar /> : null}

      <div className="min-w-full col-span-3">
        <h1 className="text-white text-center text-3xl font-bold p-6">Metas</h1>
        <div className="flex bg-white/30 m-2 p-4 rounded items-center flex-col lg:flex-row md:justify-between gap-3">
          <h3 className="text-white font-bold text-center m-2 text-2xl">
            Nova Meta
          </h3>
          <input
            type="text"
            placeholder="Objetivo"
            className="bg-gray-200 rounded p-2 text-gray-400 font-bold md:text-right flex focus:outline-none ml-1 md:ml-0"
            value={taskName}
            onChange={({ target: { value } }) => setTaskName(value)}
          />
          <input
            type="number"
            placeholder="Meta"
            className="bg-gray-200 rounded p-2 md:text-right flex focus:outline-none text-gray-400 font-bold ml-1 md:ml-0"
            value={taskGoal}
            onChange={({ target: { value } }) => setTaskGoal(value)}
          />
          <select
            className="bg-gray-200 rounded p-2 text-gray-400 font-bold md:text-right focus:outline-none"
            onChange={(event) => setTaskType(event.target.value)}
          >
            <option>Anual</option>
            <option>Mensal</option>
            <option>Semanal</option>
            <option>Diaria</option>
          </select>

          <button
            className="bg-gray-800 p-3 text-center items-center  rounded font-bold hover:bg-gray-700 text-white "
            onClick={() => handleCreate()}
          >
            Criar
          </button>
        </div>
        <div className="flex gap-3 mt-12 flex-wrap justify-center md:justify-start">
          {user.length === undefined
            ? task.map((task) => (
                <div
                  className="flex flex-col w-56 text-white font-bold"
                  key={task.id}
                >
                  <div className="flex justify-between m-1 mx-2 p-2 rounded bg-gray-3b3 hover:bg-white/30">
                    <p>Objetivo</p>
                    <p>{task.name}</p>
                  </div>
                  <div className="flex justify-between m-1 mx-2 p-2 rounded bg-gray-3b3 hover:bg-white/30">
                    <p>Tipo</p>
                    <p>{task.type}</p>
                  </div>
                  <div className="flex justify-between m-1 mx-2 p-2 rounded bg-gray-3b3 hover:bg-white/30">
                    <p>Meta</p>
                    <p>{task.goal}</p>
                  </div>
                  <div className="flex justify-between m-1 mx-2 p-2 rounded bg-gray-3b3 hover:bg-white/30">
                    <p>Mensal</p>
                    <p>{task.month}</p>
                  </div>
                  <div className="flex justify-between m-1 mx-2 p-2 rounded bg-gray-3b3 hover:bg-white/30">
                    <p>Semanal</p>
                    <p>{task.week}</p>
                  </div>
                  <div className="flex justify-between m-1 mx-2 p-2 rounded bg-gray-3b3 hover:bg-white/30">
                    <p>Diario </p>
                    <p>{task.daily}</p>
                  </div>
                  <div className="flex justify-between m-1 mx-2 p-2 rounded bg-gray-3b3 hover:bg-white/30">
                    <p>Atual </p>
                    {task.actual}
                  </div>
                  <div className="flex justify-end m-1 mx-2 ">
                    <input
                      key={task.id}
                      className="w-28 p-1 text-black text-right rounded-l focus:outline-none"
                      type="number"
                      value={taskValue[task.name]}
                      onChange={({ target: { value } }) =>
                        handleChange(value, task.id, task.name)
                      }
                    />
                    <div className="flex">
                      <button
                        className="bg-gray-818 p-1 rounded-r hover:bg-white/30"
                        onClick={() => handleSubmit(task.name)}
                      >
                        Enviar
                      </button>
                      <button className="" onClick={() => handleClick(task.id)}>
                        <img src={trash} className="w-8 hover:p-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      {!isLargeScreen ? <NavSidebar /> : null}
      {isLargeScreen ? <Stats /> : null}
    </div>
  );
};

export default TaskPage;
