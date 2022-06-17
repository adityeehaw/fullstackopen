import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>',  () => {
  let container, mockLike

  beforeEach(() => {


    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 100,
      user: {
        name: 'test',
        id: 'id',
      }
    }

    const user = {
      name: 'test',
      id: 'id',
    }

    // like = jest.fn()
    mockLike = jest.fn()

    container = render(
      <Blog blog = {blog} user = {user} likeUpdate = {mockLike} />
    ).container
  })

  test('blog only renders the title and author by default', () => {
    const titleAuthor = container.querySelector('.titleAuthor')
    const urlLikes = container.querySelector('.urlLikes')

    expect(titleAuthor).not.toHaveStyle('display: none')
    expect(urlLikes).toHaveStyle('display: none')
  })

  test('blog url and number of likes are shown when the button is clicked',async () => {
    const urlLikes = container.querySelector('.urlLikes')
    const use = userEvent.setup()
    const button = screen.getByText('View')
    await use.click(button)

    expect(urlLikes).not.toHaveStyle('display: none')

  })

  test('event handler is called twice, when the like button is clicked twice', async() => {
    const use = userEvent.setup()
    const button = screen.getByText('View')
    await use.click(button)
    const likebutton = screen.getByText('like')
    await use.click(likebutton)
    await use.click(likebutton)

    expect(mockLike.mock.calls.length).toBe(2)
  })
})