import * as Types from '../constants/ActionType';
var initialState = {
    type: "CATEGORY"
};

const statistic = (state = initialState, action) => {
    switch (action.type) {
        case Types.USER_STATISTIC:
            return {
                ...state,
                type: "USER"
            }
        case Types.CATEGORY_STATISTIC:
            return {
                ...state,
                type: "CATEGORY"
            }
        default: return state;
    }
}

export default statistic;