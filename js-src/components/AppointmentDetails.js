import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppointmentForm from './AppointmentForm'

import notie from 'notie/dist/notie.js'
import { browserHistory } from 'react-router'

import * as appointmentsActions from '../actions/appointmentsActions'

class AppointmentDetails extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSubmit (values) {
    this.props.appointmentsActions.saveAppointment(values)
    this.props.appointmentsActions.setLocalStorage(
      this.props.appointments.bookings
    )
  }

  renderLoading () {
    return (
      <div className='preloader-wrap'>
        Loading...
      </div>
    )
  }

  render () {
    // const loading = this.props.appointments.creation.loading;

    var loading = this.props.appointments.creation.loading

    return (
      <section>

        {loading ? this.renderLoading() : null}

        <header className='row heading'>
          <h3>Appointment Details</h3>
        </header>

        <AppointmentForm
          onSubmit={this.handleSubmit.bind(this)}
          bookingInfo={this.props.bookingInfo}
        />

      </section>
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

module.exports = connection(AppointmentDetails)
