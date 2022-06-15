import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  beforeEach(() => {
    const blog = {
      title: 'test',
      author: 'author',
      likes: 10,
      url: 'url',
      user: {
        name: 'test user',
        username: 'username'
      }
    }
    let component = render(<Blog blog={blog}/>)
  })

  test('renders only title and author by default',() => {
    const titleAuthor = component.container.querySelector('.titleAuthor')
  })
})