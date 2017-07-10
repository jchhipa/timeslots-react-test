import * as types from '../actions/actionTypes'

const initialState = {
  bookings: [],
  loading: false,
  err: null,
  creation: {
    created: false,
    loading: false
  }
}

let appointmentsReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_APPOINTMENTS_START:
      return { ...state, loading: true, err: null }

    case types.FETCH_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.bookings,
        err: null
      }

    case types.FETCH_APPOINTMENTS_ERROR:
      return { ...state, loading: false, err: action.err }

    case types.RESET_FORM:
      return {...state, creation: { created: false, loading: false }}

    case types.SAVE_APPOINTMENT:
      return { ...state, creation: { created: false, loading: true } }

    case types.SAVE_APPOINTMENT_SUCCESS:
      let bookings = state.bookings.slice()

      // not so great way to update the state, not recommended
      bookings[action.appointment.id - 1].firstname =
        action.appointment.firstname
      bookings[action.appointment.id - 1].lastname = action.appointment.lastname
      bookings[action.appointment.id - 1].phone = action.appointment.phone
      bookings[action.appointment.id - 1].booked = true

      return {
        ...state,
        bookings: bookings,
        creation: { created: true, loading: false }
      }

    case types.SAVE_APPOINTMENT_ERROR:
      return { ...state, creation: { created: false, loading: false } }

    default:
      return state
  }
}

export default appointmentsReducer
