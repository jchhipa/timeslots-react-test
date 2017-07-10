import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import notie from 'notie/dist/notie.js'
import { browserHistory } from 'react-router'
import AppointmentDetails from './AppointmentDetails'
import SliderPopup from './SliderPopup'

import * as appointmentsActions from '../actions/appointmentsActions'

class Appointments extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currBookingID: null,
      currBookingInfo: null,
      blAppointmentPopup: false
    }
  }

  componentDidMount () {
    this.props.appointmentsActions.fetchAppointments()
  }

  closePopup () {
    this.setState({
      currBookingID: null,
      currBookingInfo: null,
      blAppointmentPopup: false
    })
  }

  openBookingDetails (bookingInfo, index) {
    this.props.appointmentsActions.viewingAppointment()
    this.setState({
      currBookingID: index,
      currBookingInfo: bookingInfo,
      blAppointmentPopup: true
    })
  }

  renderAppointmentPopup () {
    return (
      <SliderPopup>
        <button
          id='close-popup'
          className='btn btn-primary'
          onClick={this.closePopup.bind(this)}
        >
          x
        </button>
        <AppointmentDetails
          bookingID={this.state.currBookingID}
          bookingInfo={this.state.currBookingInfo}
        />

      </SliderPopup>
    )
  }

  render () {
    let appointments = this.props.appointments

    return (
      <div class='page-wrap'>

        {this.state.blAppointmentPopup ? this.renderAppointmentPopup() : null}

        <div id='booking' class='container'>

          <div className='content'>

            <header className='heading'>
              <h3 className='text-center'>Book an Appointment!</h3>

            </header>

            <div className='slots'>
              <div className='row'>
                {appointments.bookings.map((slot, index) => {
                  let timeSuffix = parseInt(
                    slot.time.substring(0, slot.time.length - 3)
                  ) >= 12
                    ? ':00 PM'
                    : ':00 AM'

                  let activeFlag = slot.booked ? 'booked' : ''

                  return (
                    <div key={index} className='col-sm-4 slot'>
                      <div
                        className={`slot__inner ${activeFlag}`}
                        onClick={this.openBookingDetails.bind(
                          this,
                          slot,
                          index + 1
                        )}
                      >
                        {(parseInt(
                          slot.time.substring(0, slot.time.length - 3)
                        ) +
                          11) %
                          12 +
                          1 +
                          timeSuffix}

                      </div>

                    </div>
                  )
                })}

              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    appointments: state.appointments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    appointmentsActions: bindActionCreators(appointmentsActions, dispatch)
  }
}

let connection = connect(mapStateToProps, mapDispatchToProps)

module.exports = connection(Appointments)
