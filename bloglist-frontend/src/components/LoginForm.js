import userService from '../services/user'
import PropTypes from 'prop-types'

export const LoginForm = ({
  user,
  setUser,
  username,
  setUsername,
  password,
  setPassword,
  setSuccessMessage,
  setErrorMessage,
  setCounter,
  isComponentMounted,
}) => {
  const handleLogin = async (event) => {
    if (event) event.preventDefault()

    try {
      user = await userService.login({ username, password })
      if (user && isComponentMounted) {
        setUser(user)
        setUsername('')
        setPassword('')
        setCounter((counter) => counter + 1)
        localStorage.setItem('user', JSON.stringify(user))
        const current = JSON.parse(localStorage.getItem('user'))
        setSuccessMessage(current.message)

        let timer
        clearTimeout(timer)
        timer = setTimeout(() => {
          setSuccessMessage(null)
        }, 2000)
      }
    } catch (error) {
      setErrorMessage('invalid username or password!')
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        setErrorMessage(null)
        setCounter((counter) => counter + 1)
        setUser(null)
        setUsername('')
        setPassword('')
        window.location.reload()
      }, 4000)
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">
          username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <div>
          <label htmlFor="password">
            password:
            <input
              type="text"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.prototypes = {
  user: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCounter: PropTypes.func.isRequired,
  isComponentMounted: PropTypes.object.isRequired,
}
