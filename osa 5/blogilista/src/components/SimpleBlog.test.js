import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'


test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test subject',
    likes: 1
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )
 
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library')
  expect(component.container).toHaveTextContent(
    'test subject')  
  expect(component.container).toHaveTextContent(
    '1 likes')
})

test('clicking the button calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test subject',
    likes: 1
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})