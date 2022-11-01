import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogForm } from '../BlogForm'


test('test1', () => {
  const addBlog = jest.fn()
  const { container } = render(<BlogForm createBlog={addBlog}/>)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')

  const createBtn = container.querySelector('#create')

  const input = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
  }


  userEvent.type(titleInput, input.title)
  userEvent.type(authorInput, input.author)
  userEvent.type(urlInput, input.url)

  userEvent.click(createBtn)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0]).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe(input.title)
  expect(addBlog.mock.calls[0][0].author).toBe(input.author)
  expect(addBlog.mock.calls[0][0].url).toEqual(input.url)


})