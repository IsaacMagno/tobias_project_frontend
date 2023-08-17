import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChampions } from "../../Redux/reducers/championsSlice";
import { setUser } from "../../Redux/reducers/userSlice";
import { addEvent, removeEvent, getStats } from "../../services/axiosRequests";

import FullCalendar from "@fullcalendar/react";
import daydgridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

const RenderCalendar = () => {
  const [color, selectColor] = useState("green");
  const [events, setEvents] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const calendarRef = useRef();

  const champions = useSelector((state) => state.champions);
  const { user, logged } = useSelector((state) => state.user);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setAspectRatio(calendarApi);

      window.addEventListener("resize", () => setAspectRatio(calendarApi));
      return () =>
        window.removeEventListener("resize", () => setAspectRatio(calendarApi));
    }
  }, []);

  useEffect(() => {
    if (!logged) return navigate("/");

    const userAtt = champions.champions.filter(
      (champ) => champ.username.toLowerCase() === user.username.toLowerCase()
    );

    dispatch(setUser(userAtt[0]));

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

    const allEvents = calendarApi.getEvents();

    const eventExists = allEvents.filter(
      (day) => day.startStr === dateClickInfo.dateStr
    );

    if (eventExists.length) {
      eventExists[0].remove();
      var date = {
        date: dateClickInfo.dateStr,
      };
      await removeEvent(date, id);
    } else {
      var newEvent = {
        title: "",
        date: dateClickInfo.dateStr,
        display: "background",
        backgroundColor: color,
      };
      calendarApi.addEvent(newEvent);
      await addEvent(newEvent, id);
    }

    await getStats().then((o) => dispatch(setChampions(o)));
  };

  const setAspectRatio = (calendar) => {
    let width = window.innerWidth;
    if (width < 576) {
      calendar.setOption("aspectRatio", 1);
    } else if (width <= 768) {
      calendar.setOption("aspectRatio", 1.5);
    } else if (width <= 992) {
      calendar.setOption("aspectRatio", 1.5);
    } else if (width <= 1200) {
      calendar.setOption("aspectRatio", 2);
    } else {
      calendar.setOption("aspectRatio", 2.5);
    }
  };

  return events ? (
    <div className="flex flex-col justify-center p-2">
      <div className="m-auto ">
        <button
          type="button"
          className="btn-calendar bg-green-600 hover:bg-green-500"
          onClick={() => selectColor("green")}
        />
        <button
          type="button"
          className="btn-calendar bg-yellow-400 hover:bg-yellow-200"
          onClick={() => selectColor("yellow")}
        />
        <button
          type="button"
          className="btn-calendar bg-red-600 hover:bg-red-500"
          onClick={() => selectColor("red")}
        />
      </div>
      <div className="my-1 ">
        <FullCalendar
          ref={calendarRef}
          plugins={[daydgridPlugin, interactionPlugin, bootstrap5Plugin]}
          locale="pt-br"
          dateClick={handleDateClick}
          // height={525}
          // height={225}
          aspectRatio={window.innerWidth < 768 ? 1 : 2}
          events={events}
        />
      </div>
    </div>
  ) : null;
};

export default RenderCalendar;
