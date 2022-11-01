import { Blog } from '../Blog'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  }

  const idx = 1
  const setSuccessMessage = () => ''
  const setErrorMessage = () => ''
  const setCounter = (c) => c + 1
  const isComponentMounted = { current: true }
  let spanTitle, spanAuthor, spanLikes, spanUrl, likes, url
  //const mockHandler = jest.fn()

  beforeEach(() => {
    let { container } = render(
      <Blog
        key={idx}
        blog={blog}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        setCounter={setCounter}
        isComponentMounted={isComponentMounted}
      />
    )

    spanTitle = container.querySelector('.blog-title')
    spanAuthor = container.querySelector('.blog-author')
    spanLikes = container.querySelector('.blog-likes')
    spanUrl = container.querySelector('.blog-url')
    likes = screen.getByTestId('likes')
    url = screen.getByTestId('url')
  })
  test('it checks if properties of blog are present', () => {
    expect(spanLikes).toBeInTheDocument()
    expect(spanUrl).toBeInTheDocument()
    expect(spanTitle).toBeInTheDocument()
    expect(spanAuthor).toBeInTheDocument()
  })
  test('it checks if title and author are visible and url and likes are not', () => {
    expect(spanTitle).toBeVisible()
    expect(spanAuthor).toBeVisible()
    expect(spanLikes).not.toBeVisible()
    expect(spanUrl).not.toBeVisible()
  })
  test('it checks if url and likes are not visible on screen', () => {
    const elemLikes = likes
    const elemUrl = url

    expect(elemLikes).not.toBeVisible()
    expect(elemUrl).not.toBeVisible()
  })
  test('it determines whether the URL and Likes will be visible after selecting view btn or inactive after selecting hide btn', () => {
    userEvent.click(screen.getByTestId('view'))
    expect(spanLikes).toBeVisible()
    expect(spanUrl).toBeVisible()

    userEvent.click(screen.getByTestId('hide'))
    expect(spanUrl).not.toBeVisible()
    expect(spanLikes).not.toBeVisible()
  })
  test('it checks if hide, add like btn will be visible after clicking view btn', () => {
    const hideBtn = screen.getByTestId('hide')
    const addLikeBtn = screen.getByTestId('addLike')
    userEvent.click(screen.getByTestId('view'))

    expect(spanLikes).toBeVisible()
    expect(hideBtn).toBeVisible()
    expect(addLikeBtn).toBeVisible()
  })

})

