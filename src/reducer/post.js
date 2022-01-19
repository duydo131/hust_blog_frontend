import * as Types from '../constants/ActionType';
var id = localStorage.getItem("postId")
var initialState = {
    id,
};

const post = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHANGE_POST:
            localStorage.setItem("postId", action.id)
            return {
                ...state,
                id: action.id,
            }
        default: return state;
    }
}

export default post;