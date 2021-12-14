
export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let filteredArray = [];
  if (state.days.length === 0) {
    return filteredArray;
  }
  const arrayOfDays = state.days.filter((obj) => obj.name === day);

  if (arrayOfDays.length === 0) {
    return filteredArray;
  }

  arrayOfDays[0].appointments.forEach(el => {
    for (let appointment in state.appointments) {
      if (el === state.appointments[appointment].id) {
        filteredArray.push(state.appointments[appointment]);
      }
    }
  });

  return filteredArray;
}

// const appointment = {
//   "1": {
//     "id": 1,
//     "time": "12pm",
//     "interview": {
//       "student": "Archie Cohen",
//       "interviewer": 1
//     }
//   }
// }

// const interviewer = {
//   "1": {
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }

// const returnedObj = {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }

export function getInterview(state, interview) {
  let interviewObj = {};

  if (interview === null) {
    return null;
  }

  // We need interviewers obj and we need appointments data
  for (let appointment in state.appointments) {
    if (state.appointments[appointment].interview === null) {
      continue;
    }

    const interviewId = interview[Object.keys(interview)[1]];
    const appointInterviewerId = state.appointments[appointment]["interview"]["interviewer"];

    if (appointInterviewerId === interviewId) {
      interviewObj["student"] = state.appointments[appointment]["interview"]["student"];
      interviewObj = {...interview};
      interviewObj["interviewer"] = {...state.interviewers[`${state.appointments[appointment]["interview"]["interviewer"]}`]};
    }
  }
  return interviewObj;
}