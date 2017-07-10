import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { renderField } from './FormFields/RenderField'
import notie from 'notie/dist/notie.js'

import * as appointmentsActions from '../actions/appointmentsActions'

const required = value => (value ? undefined : 'Required')

class AppointmentForm extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.handleInitialize()
  }

  handleInitialize (nextProps = null) {
    if (typeof this.props.bookingInfo !== 'undefined') {
      const initData = {
        firstname: this.props.bookingInfo.firstname,
        lastname: this.props.bookingInfo.lastname,
        phone: this.props.bookingInfo.phone,
        id: this.props.bookingInfo.id
      }

      this.props.initialize(initData)
    }
  }

  renderForm () {
    const booking = this.props.booking
    const { pristine, submitting } = this.props
    var me = this

    return (
      <div className='step1 active'>
        <div className='section'>
          <div className='row'>
            <Field
              name='firstname'
              placeholder='First Name'
              component={renderField}
              type='text'
              label='First Name'
              validate={[required]}
            />

          </div>

          <div className='row'>
            <Field
              placeholder='Last Name'
              label='Last Name'
              component={renderField}
              type='text'
              name='lastname'
              validate={[required]}
            />
          </div>

          <div className='row'>
            <Field
              placeholder='Phone'
              label='Phone'
              component={renderField}
              type='text'
              name='phone'
              validate={[required]}
            />
          </div>

          <div className='row'>
            <Field component={renderField} type='hidden' name='id' />
          </div>

        </div>

        <div className='row form-row'>
          <button
            className='btn btn-primary right'
            type='submit'
            disabled={pristine || submitting}
          >
            Book
          </button>
        </div>
      </div>
    )
  }

  renderTick () {
    return (
      <div className='center successTick'>
        <svg
          className='checkmark active'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 52 52'
        >
          <circle
            className='checkmark__circle'
            cx='26'
            cy='26'
            r='25'
            fill='none'
          />
          <path
            className='checkmark__check'
            fill='none'
            d='M14.1 27.2l7.1 7.2 16.7-16.8'
          />
        </svg>
        <h4 className='message'>
          Booked Appointment Successfully
        </h4>
      </div>
    )
  }

  formSubmit (values) {
    this.props.handleSubmit(values)
  }

  render () {
    var bookingCreated = this.props.appointments.creation.created

    return (
      <div>
        <form onSubmit={this.formSubmit.bind(this)}>
          <div className='section'>
            {!bookingCreated ? this.renderForm() : this.renderTick()}
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
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

var reduxConnectedComponent = connection(AppointmentForm)

export default reduxForm({
  form: 'AppointmentForm' // a unique identifier for this form
})(reduxConnectedComponent)
