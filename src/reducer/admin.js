import * as Types from '../constants/ActionType';
var isAdmin = localStorage.getItem('user') === 'admin';
var initialState = isAdmin;

const admin = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGOUT:
            return false
        case Types.LOGIN_ADMIN:
            return true
        default: return state;
    }
}

export default admin;