export function renderField ({
  input,
  label,
  type,
  placeholder,
  value,
  meta: { touched, error, warning },
  children
}) {
  let fieldt = null

  switch (type) {
    case 'text':
    case 'checkbox':
    case 'radio':
    case 'file':
    case 'password':
      fieldt = (
        <input
          id={input.name}
          {...input}
          type={type}
          className={`form-control`}
          placeholder={placeholder}
        />
      )
      break
    case 'hidden':
      fieldt = <input id={input.name} {...input} type={type} />
      break
    default:
      fieldt = (
        <input
          id={input.name}
          {...input}
          type={type}
          placeholder={placeholder}
        />
      )
  }

  let formRowClass = 'form-row form-group ' + type

  return (
    <div className={formRowClass}>
      <label for={input.name}>{label}</label>
      {fieldt}
      
      <div>
        {touched &&
          ((error && <span className='error'>* {error}</span>) ||
            (warning && <span className='warning'>* {warning}</span>))}
      </div>
    </div>
  )
}
