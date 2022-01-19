import * as Types from './../constants/ActionType';

export const actLogin = () => {
    return {
        type: Types.LOGIN,
    }
}

export const actLoginAdmin = () => {
    return {
        type: Types.LOGIN_ADMIN,
    }
}

export const actLogout = () => {
    return {
        type: Types.LOGOUT,
    }
}

export const actEnableToast = (message) => {
    return {
        type: Types.ENABLE_TOAST,
        message: message,
    }
}

export const actDisableToast = () => {
    return {
        type: Types.DISABLE_TOAST,
    }
}

export const actChangePost = (id) => {
    return {
        type: Types.CHANGE_POST,
        id,
    }
}

export const actChangeSlug = (title, name) => {
    return {
        type: Types.CHANGE_SLUG,
        title,
        name,
    }
}

export const actChangeSlugParent = (title, name) => {
    return {
        type: Types.CHANGE_SLUG_PARENT,
        title,
        name,
    }
}

export const actEnableManager = () => {
    return {
        type: Types.ENABLE_MANAGER,
    }
}

export const actDisableManager = () => {
    return {
        type: Types.DISABLE_MANAGER,
    }
}

export const actUserStatistic = () => {
    return {
        type: Types.USER_STATISTIC,
    }
}

export const actCategoryStatistic = () => {
    return {
        type: Types.CATEGORY_STATISTIC,
    }
}