import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
//import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
//import notificationReducer from './reducers/notificationReducer'
//import filterReducer from './reducers/filterReducer'
//import { createStore, combineReducers } from 'redux'
//import anecdoteService from './services/anecdotes'

//const reducer = combineReducers({
//  anecdotes: anecdoteReducer,
//  notification: notificationReducer,
//  filter: filterReducer
//})
//const store = createStore(reducer)

//anecdoteService.getAll().then(anecdotes =>
//  store.dispatch(initializeAnecdotes(anecdotes))
//)
//anecdoteService.getAll().then(anecdote =>
//  anecdote.forEach(anecdote => {
//    store.dispatch({ type: 'NEW_ANECDOTE', data: anecdote })
//  })
//)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)