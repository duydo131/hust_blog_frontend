import * as Types from '../constants/ActionType';
var isAdmin = localStorage.getItem('user') === 'admin';
var initialState = {
    name : 'Trang chủ',
    title: 'trang-chu'
};

const slug = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHANGE_SLUG:
            return {
                ...state,
                title: action.title,
                name: action.name,
            }
        default: return state;
    }
}

export default slug;