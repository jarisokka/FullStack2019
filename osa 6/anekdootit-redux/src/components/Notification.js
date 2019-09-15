import React from 'react'
//import { createStore } from 'redux'
//import notificationReducer from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

const { notification } = props
console.log('notification start content ' + notification.content)
const showNotification = { display: notification.visibility ? '' : 'none' }

console.log('notification ' + notification.actionType)
const message = notification.actionType === 'VOTE' ?
` ` : `you voted '${notification.content}'`


  return (
    <div style={showNotification}>
      <div style={style}>
        {message}
      </div>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)