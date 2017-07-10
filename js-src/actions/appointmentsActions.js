import * as types from './actionTypes'
import notie from 'notie/dist/notie.js'

export function fetchAppointmentsStart () {
  return {
    type: types.FETCH_APPOINTMENTS_START
  }
}

export function fetchAppointments () {
  return dispatch => {
    dispatch(fetchAppointmentsStart())

    let timeslotsLS = localStorage.getItem('timeslots')

    console.log(timeslotsLS, 'timeslotssss')
    if (!timeslotsLS) {
      fetch(`http://localhost:3000/appointments`)
        .then(response => response.json())
        .then(json => {
          if (Array.isArray(json) && json.length > 0) {
            dispatch(fetchAppointmentsSuccess(json))
          } else {
            dispatch(
              fetchAppointmentsError(
                'There was a problem fetching appointments'
              )
            )
          }
        })
        .catch(err => {
          throw err
        })
    } else {
      dispatch(fetchAppointmentsSuccess(JSON.parse(timeslotsLS)))
    }
  }
}

export function fetchAppointmentsSuccess (bookings) {
  return {
    type: types.FETCH_APPOINTMENTS_SUCCESS,
    bookings
  }
}

export function fetchAppointmentsError (err) {
  return {
    type: types.FETCH_APPOINTMENTS_ERROR,
    err
  }
}

export function viewingAppointment() {
  return {
    type: types.RESET_FORM
  }
}

export function saveAppointment (appointment) {
  return {
    type: types.SAVE_APPOINTMENT_SUCCESS,
    appointment
  }
}

export function setLocalStorage (bookings) {
  return dispatch => {
    localStorage.setItem('timeslots', JSON.stringify(bookings))
  }
}
