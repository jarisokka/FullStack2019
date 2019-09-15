const notificationAtStart = 'new nofication'

const initialState = {
    content: notificationAtStart,
    actionState: 'NULL',
    visibility: false
  }

const notificationReducer = (state = initialState, action) => {
    console.log('note state now: ', state)
    console.log('note action', action)
    switch (action.type) {
    case 'NEW_NOT':
        return state = { content: action.content, actionState: action.actionType, visibility: true }
      case 'HIDE_NOT':
        return state = initialState
      default:
        return state
      }
    }

export const showNotific = (content, actionState) => {
    return {
        type: 'NEW_NOT',
        content,
        actionState
       }
    }

export const hideNotific = () => {
    return {
        type: 'HIDE_NOT'
        }
    }    

export default notificationReducer