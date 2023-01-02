import React, { useState, useEffect } from "react";

import NavSidebar from "../components/NavSidebar";
import Stats from "../components/Stats";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../Redux/reducers/userSlice";
import { setChampions } from "../Redux/reducers/championsSlice";

import { updateTask, getStats, createTask } from "../services/axiosRequests";

const TaskPage = () => {
  const [taskName, setTaskName] = useState();
  const [taskGoal, setTaskGoal] = useState();
  const [taskType, setTaskType] = useState("Anual");

  const [taskValue, setTaskValue] = useState({});
  const [taskId, setTaskId] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const champions = useSelector((state) => state.champions);

  if (user.length === undefined) {
    var { task } = user;
  }

  useEffect(() => {
    if (user.length !== undefined) return navigate("/");

    const userAtt = champions.champions.filter(
      (champ) => champ.username.toLowerCase() === user.name.toLowerCase()
    );

    dispatch(setUser(userAtt[0]));
  }, [champions, user]);

  const handleUpdate = async () => {
    await getStats().then((o) => dispatch(setChampions(o)));
  };

  const handleChange = async (task, id, name) => {
    setTaskValue({ [name]: task });
    setTaskId(id);
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

  return (
    <div className='bg-hero grid grid-cols-7 gap-3 min-h-screen bg-no-repeat bg-cover bg-center bg-fixed opacity-95'>
      <div className='col-span-1'>
        <NavSidebar />
      </div>
      <div className='max-w-full col-span-5 '>
        <h1 className='text-white text-center text-3xl font-bold mt-2 border-t p-6'>
          Metas
        </h1>
        <div className='flex bg-white/30 p-4 rounded items-center'>
          <div className='flex justify-between'>
            <h3 className='text-white font-bold text-center m-2 text-2xl'>
              Nova Meta
            </h3>
            <input
              type='text'
              placeholder='Objetivo'
              className='bg-transparent text-gray-400 font-bold text-right flex focus:outline-none'
              value={taskName}
              onChange={({ target: { value } }) => setTaskName(value)}
            />
            <input
              type='number'
              placeholder='Meta'
              className='bg-transparent text-right flex focus:outline-none text-gray-400'
              value={taskGoal}
              onChange={({ target: { value } }) => setTaskGoal(value)}
            />
            <select
              className='bg-transparent text-gray-400 font-bold text-right  focus:outline-none ml-44'
              onChange={({ target: value }) => setTaskType(value)}
            >
              <option>Anual</option>
              <option disabled>Mensal</option>
              <option disabled>Semanal</option>
              <option disabled>Diaria</option>
            </select>
            <button
              className='bg-gray-800 p-3  rounded font-bold hover:bg-gray-700 text-white flex ml-32'
              onClick={() => handleCreate()}
            >
              Criar
            </button>
          </div>
        </div>
        <div className='flex gap-3 mt-12 flex-wrap ml-12'>
          {user.length === undefined
            ? task.map((task) => (
                <div
                  className='flex flex-col w-56 text-white font-bold'
                  key={task.id}
                >
                  <div className='flex justify-between m-1 mx-2 p-2 rounded bg-gray-700 hover:bg-gray-600'>
                    <p>Objetivo </p>
                    <p>{task.name}</p>
                  </div>
                  <div className='flex justify-between m-1 mx-2 p-2 rounded bg-gray-700 hover:bg-gray-600'>
                    <p>Tipo </p>
                    <p>{task.type}</p>
                  </div>
                  <div className='flex justify-between m-1 mx-2 p-2 rounded bg-gray-700 hover:bg-gray-600'>
                    <p>Meta </p>
                    <p>{task.goal}</p>
                  </div>
                  <div className='flex justify-between m-1 mx-2 p-2 rounded bg-gray-700 hover:bg-gray-600'>
                    <p>Mensal </p>
                    <p>{task.month}</p>
                  </div>
                  <div className='flex justify-between m-1 mx-2 p-2 rounded bg-gray-700 hover:bg-gray-600'>
                    <p>Semanal </p>
                    <p>{task.week}</p>
                  </div>
                  <div className='flex justify-between m-1 mx-2 p-2 rounded bg-gray-700 hover:bg-gray-600'>
                    <p>Atual </p>
                    {task.actual}
                  </div>
                  <div className='flex justify-end m-1 mx-2 p-2'>
                    <input
                      key={task.id}
                      className='w-24 p-1 text-black text-right rounded-l focus:outline-none'
                      type='number'
                      value={taskValue[task.name]}
                      onChange={({ target: { value } }) =>
                        handleChange(value, task.id, task.name)
                      }
                    />
                    <button
                      className='bg-gray-800 p-1 rounded-r hover:bg-gray-800/80'
                      onClick={() => handleSubmit(task.name)}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      <div className='col-span-1'>
        <Stats />
      </div>
    </div>
  );
};

export default TaskPage;
