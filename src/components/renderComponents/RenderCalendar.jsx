import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addEvent } from "../../services/axiosRequests";
import FullCalendar from "@fullcalendar/react";
import daydgridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

const renderCalendar = () => {
  const [color, selectColor] = useState("green");
  const [events, setEvents] = useState();
  const champions = useSelector((state) => state.champions);

  useEffect(() => {
    const {
      selectedChampion: {
        calendars: { events },
      },
    } = champions;

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
  }, [champions]);

  const handleDateClick = async (dateClickInfo) => {
    const {
      selectedChampion: { id },
    } = champions;

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
    <div>
      <div className='d-flex justify-content-center mt-4'>
        <button
          type='button'
          className='btn btn-green btn-circle btn-xl m-1'
          onClick={() => selectColor("green")}
        />
        <button
          type='button'
          className='btn btn-warning btn-circle btn-xl m-1'
          onClick={() => selectColor("yellow")}
        />
        <button
          type='button'
          className='btn btn-red btn-circle btn-xl m-1'
          onClick={() => selectColor("red")}
        />
      </div>
      <FullCalendar
        plugins={[daydgridPlugin, interactionPlugin, bootstrap5Plugin]}
        locale='pt-br'
        dateClick={handleDateClick}
        // themeSystem='bootstrap5'
        events={events}
      />
    </div>
  ) : null;
};

export default renderCalendar;
