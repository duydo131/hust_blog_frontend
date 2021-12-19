import * as Types from './../constants/ActionType';

export const actAddToCart = (product, quantity) => {
    return {
        type: Types.ADD_TO_CART,
        product,
        quantity
    }
}

export const actChangeMessage = (message) => {
    return {
        type: Types.CHANGE_MESSAGE,
        message
    }
}

export const actDeleteProductInCart = (product) => {
    return {
        type: Types.DELETE_PRODUCT_IN_CART,
        product
    }
}

export const actDeleteAllInCart = () => {
    return {
        type: Types.DELETE_ALL_IN_CART,
    }
}

export const actUpdateProductInCart = (product, quantity) => {
    return {
        type: Types.UPDATE_PRODUCT_IN_CART,
        product,
        quantity
    }
}

export const actFetchProduct = (products) => {
    return {
        type: Types.FETCH_PRODUCT,
        products
    }
}

export const actLogin = (isAd) => {
    if (isAd) {
        return {
            type: Types.LOGIN_ADMIN,
        }
    }
    return {
        type: Types.LOGIN,
    }
}

export const actLogout = () => {
    return {
        type: Types.LOGOUT,
    }
}