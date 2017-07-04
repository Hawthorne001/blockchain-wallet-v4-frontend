import * as T from './actionTypes'

const INITIAL_STATE = {}

const settingsReducer = (state = INITIAL_STATE, action) => {
  let { type } = action
  switch (type) {
    case T.FETCH_SETTINGS_SUCCESS: {
      let { payload } = action
      return payload
    }
    default:
      return state
  }
}

export default settingsReducer
