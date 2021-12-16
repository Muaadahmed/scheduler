import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import "components/Appointment";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [
      {
        id: 1,
        time: "12pm"
      },
      {
        id: 2,
        time: "1pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer:{
            id: 3,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png"
          }
        }
      },
      {
        id: 3,
        time: "2pm"
      },
      {
        id: 4,
        time: "3pm",
        interview: {
          student: "Archie Andrews",
          interviewer:{
            id: 4,
            name: "Cohana Roy",
            avatar: "https://i.imgur.com/FK8V841.jpg"
          }
        }
      },
      {
        id: 5,
        time: "4pm"
      }
    ],
    interviewers: {}
  });

  const setDay = day => setState({...state, day});
  //const setDays = days => setState(prev => ({...prev, days}));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      console.log(all[2].data);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
    .catch(err => console.log(err.message))
  },[])
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //setState((prev) => ({...prev, ...appointments}))
    setState({...state, appointments});
    console.log(id, interview);
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const appointmentList = dailyAppointments.map( appointment => {
    const interview = getInterview(state, appointment.interview);
    console.log("interview app", interview);
    console.log("spreaded appointments", {...appointment});
    return (
      <Appointment key={appointment.id} interview={interview} {...appointment} interviewers={dailyInterviewers} bookInterview={bookInterview}/>
    )
  });
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList days={state.days} value={state.day} onChange={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        <ul>
          {appointmentList}
        </ul>
      </section>
    </main>
  );
}
