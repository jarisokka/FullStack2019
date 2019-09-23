import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
jest.mock('../services/blogs')
import App from '../App'


describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    
    await waitForElement(
      () => component.getByText('login'))

    const login = component.container.querySelector('.login')
    expect(login).not.toHaveStyle('display: none')

    const blogs = component.container.querySelectorAll('.start')
    expect(blogs.length).toBe(0)
    
  })



  test('renders all blogs it gets from backend', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
      
    localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    //component.debug()

    await waitForElement(
      () => component.container.querySelector('.start')
    )

    const blogs = component.container.querySelectorAll('.start')  
    expect(blogs.length).toBe(4) 

    expect(component.container).toHaveTextContent(
      'First class tests'
    )
    expect(component.container).toHaveTextContent(
      'Robert C. Martin'
    )
  })
})