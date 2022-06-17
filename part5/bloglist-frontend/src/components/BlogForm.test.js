import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('handler called with right details', async() => {
  const createBlog = jest.fn()
  const user = userEvent.setup()
  render(<BlogForm createBlog={createBlog}/>)

  const inputTitle = screen.getByPlaceholderText('Title')
  const inputAuthor = screen.getByPlaceholderText('Author')
  const inputUrl = screen.getByPlaceholderText('Url')

  fireEvent.change(inputTitle, {
    target: { value: 'NewTitle' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'NewAuthor' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'NewUrl' }
  })
  //   await user.type(inputTitle, 'NewTitle')
  //   await user.type(inputAuthor, 'NewAuthor')
  //   await user.type(inputUrl, 'NewUrl')

  const sendButton = screen.getByText('create')
  await user.click(sendButton)

  const expected = {
    title: 'NewTitle',
    author: 'NewAuthor',
    url: 'NewUrl',
  }

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual(expected)

})