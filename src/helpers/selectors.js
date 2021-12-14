
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