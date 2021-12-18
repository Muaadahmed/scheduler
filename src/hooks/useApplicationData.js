import React, {useState, useEffect} from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
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
      console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
    .catch(err => console.log(err.message))
  },[])
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // console.log("bookinterview appointment obj", appointment);
  
    const obj = {
      id: appointment.id,
      time: appointment.time,
      interview: {
        student: appointment.interview.student,
        interviewer: appointment.interview.interviewer.id
      }
    }
  
    const appointments = {
      ...state.appointments,
      [id]: obj
    };
    //setState((prev) => ({...prev, ...appointments}))
    return axios.put(`/api/appointments/${appointment.id}`, obj)
      .then(() => {
        setState((prev) => ({...prev, appointments}))
      })
     // .catch(err => console.log('axios put error', err.message))
    // console.log("book interview id and interview: ", id, interview);
    // console.log("bookInterview appointments", appointments);
  }
  
  function cancelInterview(id) {
    // state.appointments[id].interview = null;
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.delete(`/api/appointments/${appointment.id}`)
      .then(() => {
        setState({...state, appointments});
        console.log('from cancel interview', state.appointments)
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
};