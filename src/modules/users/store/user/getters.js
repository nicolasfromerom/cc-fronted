export const getUsersList =  ( state ) => () => {
    return state.users
}

export const getUsersPaginationData =  ( state ) => () => {
    return state.meta
}

export const getUsersById =  ( state ) => () => {
    return state.user
}

export const getIsCreated = (state) => () => {
    return state.isCreated
}

export const getErrors = (state) => () => {
    return state.errors
}