/* eslint-disable */
import { useRef, useState } from 'react'
import { Togglable } from './Togglable'
import blogService from '../services/blogs'

import PropTypes from 'prop-types'

export const Blog = ({
  blog,
  setSuccessMessage,
  setErrorMessage,
  setCounter,
  isComponentMounted,
}) => {
  const [like, setLike] = useState(blog.likes)

  const blogContentRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = async () => {
    try {
      setLike(blog.likes + 1)
      const response = await blogService.update(blog.id, {
        likes: blog.likes + 1,
      })
      if (response && isComponentMounted) {
        setSuccessMessage(
          `You like the blog ${response.data.title} by ${response.data.author} with ${response.data.likes} likes!`
        )
        setCounter((counter) => counter + 1)
        let timer
        clearTimeout(timer)
        timer = setTimeout(() => {
          setSuccessMessage(null)
        }, 1000)
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(error.response.data.error)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        setErrorMessage(null)
        window.location.reload()
      }, 3000)
    }
  }

  const deleteBlog = async (event) => {
    try {
      const confirm = window.confirm(
        `Remove blog ${blog.title} by ${blog.author}`
      )
      if (confirm) {
        const response = await blogService.remove(event.target.value)
        if (response.status === 200 && isComponentMounted) {
          setSuccessMessage(response.data.message)
          let timer
          clearTimeout(timer)
          timer = setTimeout(() => {
            setSuccessMessage(null)
            window.location.reload()
          }, 1000)
        }
      }
    } catch (error) {
      setErrorMessage(error.response.data.error)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        setErrorMessage(null)
        window.location.reload()
      }, 3000)
    }
  }

  return (
    <div style={blogStyle}>
      <div key={blog.id}>
        {blog.title} {blog.author}
        <Togglable buttonLabel="view" close="hide" ref={blogContentRef}>
          <div>{blog.url}</div>
          <div>
            likes {like}
            <button value={blog.likes} onClick={addLike}>
              like
            </button>
          </div>

          {blog?.user?.map((u, i) => {
            return (
              <div key={i}>
                <div key={u.id}>{u.name}</div>
              </div>
            )
          })}
          <div>
            <button value={blog.id} onClick={deleteBlog}>
              remove
            </button>
          </div>
        </Togglable>
      </div>
    </div>
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  setErrorMessage:  PropTypes.func.isRequired,
  setCounter:  PropTypes.func.isRequired,
  isComponentMounted:  PropTypes.object.isRequired,
}

