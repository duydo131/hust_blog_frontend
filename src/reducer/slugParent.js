import * as Types from '../constants/ActionType';
var initialState = {
    name : 'Trang chủ',
    title: 'trang-chu'
};

const slugParent = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHANGE_SLUG_PARENT:
            return {
                ...state,
                title: action.title,
                name: action.name,
            }
        default: return state;
    }
}

export default slugParent;