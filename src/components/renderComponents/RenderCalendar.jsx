import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../../services/axiosRequests";

import FullCalendar from "@fullcalendar/react";
import daydgridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

const RenderCalendar = () => {
  const [color, selectColor] = useState("green");
  const [events, setEvents] = useState();

  const navigate = useNavigate();

  const { user, logged } = useSelector((state) => state.user);

  useEffect(() => {
    if (!logged) return navigate("/");
    const {
      calendars: { events },
    } = user;

    const filteredEvents = events.map((ev) => {
      const eventObj = {
        title: ev.title,
        date: ev.date,
        display: ev.display,
        backgroundColor: ev.backgroundColor,
      };
      return eventObj;
    });

    setEvents(filteredEvents);
  }, [user]);

  const handleDateClick = async (dateClickInfo) => {
    const { id } = user;

    const calendarApi = dateClickInfo.view.calendar;

    const newEvent = {
      title: "",
      date: dateClickInfo.dateStr,
      display: "background",
      backgroundColor: color,
    };

    calendarApi.addEvent(newEvent);

    return await addEvent(newEvent, id);
  };

  return events ? (
    <div className='flex flex-col justify-center p-2'>
      <div className='m-auto my-4'>
        <button
          type='button'
          className='btn-calendar bg-green-600 hover:bg-green-500'
          onClick={() => selectColor("green")}
        />
        <button
          type='button'
          className='btn-calendar bg-yellow-400 hover:bg-yellow-200'
          onClick={() => selectColor("yellow")}
        />
        <button
          type='button'
          className='btn-calendar bg-red-600 hover:bg-red-500'
          onClick={() => selectColor("red")}
        />
      </div>
      <div className='w-1/2 m-auto'>
        <FullCalendar
          plugins={[daydgridPlugin, interactionPlugin, bootstrap5Plugin]}
          locale='pt-br'
          dateClick={handleDateClick}
          height={525}
          events={events}
        />
      </div>
    </div>
  ) : null;
};

export default RenderCalendar;
