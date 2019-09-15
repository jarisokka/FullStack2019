const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {   
    case 'GOOD':
      const newG = state.good + 1
      return state = {
        good: newG,
        ok: state.ok,
        bad: state.bad
      }
    case 'OK':
      const newO = state.ok + 1
      return state = {
        good: state.good,
        ok: newO,
        bad: state.bad
      }
    case 'BAD':
      const newB = state.bad + 1
      return state = {
        good: state.good,
        ok: state.ok,
        bad: newB
      }
    case 'ZERO':
      return state = {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return state
  }
  
}

export default counterReducer