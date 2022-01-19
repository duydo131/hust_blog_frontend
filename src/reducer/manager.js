import * as Types from '../constants/ActionType';
var initialState = localStorage.getItem("MANAGER")

const manager = (state = initialState, action) => {
    switch (action.type) {
        case Types.ENABLE_MANAGER:
            localStorage.setItem("MANAGER", true)
            return true
        case Types.DISABLE_MANAGER:
            localStorage.setItem("MANAGER", false)
            return false
        default: return state;
    }
}

export default manager;