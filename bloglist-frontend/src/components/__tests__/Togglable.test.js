import { Togglable } from '../Togglable'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Togglable />', () => {
  let blogContentRef = { current: true }
  let addLikeBtn

  const handleClick = jest.fn()

  const { container } = render(
    <Togglable buttonLabel="view" close="hide" ref={blogContentRef}>
      <div>
        <span className="blog-url" data-testid="url">
          http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html
        </span>
      </div>
      <div>
        likes
        <span className="blog-likes" data-testid="likes"></span>
        <button className="addLike" data-testid="addLike" onClick={handleClick}>
          like
        </button>
      </div>
    </Togglable>
  )

  addLikeBtn = container.querySelector('.addLike')

  test('it check if the add like button is clicked twice, it will be called twice', () => {
    userEvent.dblClick(addLikeBtn)
    expect(handleClick).toHaveBeenCalledTimes(2)
  })
})
