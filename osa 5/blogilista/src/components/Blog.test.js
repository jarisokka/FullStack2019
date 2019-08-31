import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('Blog test', () => {
  let component

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test subject',
    likes: 1
    }
    
  const mockHandler1 = jest.fn()
  const mockHandler2 = jest.fn() 
      
  beforeEach(() => {
    component = render(
      <Blog
      blog={blog}
      like={mockHandler1}
      remove={mockHandler2}
      username='testaaja'/>
    )
  })
  
    test('at start title and author are displayed', () => {
      const start = component.container.querySelector('.start')
      expect(start).not.toHaveStyle('display: none')

      const details = component.container.querySelector('.details')
      expect(details).toHaveStyle('display: none')
    })
  
    test('after clicking the button, details are displayed', () => {
      const row = component.container.querySelector('.start')
      fireEvent.click(row)
  
      const details = component.container.querySelector('.details')
      expect(details).not.toHaveStyle('display: none')
    })
  })