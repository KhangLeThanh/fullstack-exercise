import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import Blog from './Blog'

test('renders blog', () => {
  const blog = {
    author: 'Taka',
    url:'taka.com',
    title: 'Title testing',
    likes:'2'
  }

  const component = render(
    <Blog blog={blog} />
  )
  const li = component.container.querySelector('li')
  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    'Title testing'
  )
  const element = component.getByText(
    'Title testing'
  )
  expect(element).toBeDefined()
  expect(blog).toHaveProperty('author', 'Taka')
  const test_url = { url:'taka.com' }
  expect(blog).toMatchObject(test_url)

})