import PropTypes from 'prop-types'

import '../styles.css'

export const Notification = ({ error, success }) => {
  if (error === null) {
    return null
  } else if (success === null) {
    return null
  } else if (success) {
    return (
      <div className="success" data-testid="success-msg">
        {success}
      </div>
    )
  } else if (error) {
    return (
      <div className="error" data-testid="error-msg">
        {error}
      </div>
    )
  } else {
    return null
  }
}

Notification.propTypes = {
  error: PropTypes.string,
  success: PropTypes.string,
}
