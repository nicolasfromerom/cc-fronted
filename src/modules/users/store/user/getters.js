export const getUsersList =  ( state ) => () => {
    return state.users
}

export const getUsersPaginationData =  ( state ) => () => {
    return state.meta
}

export const getUsersById =  ( state ) => () => {
    return state.user
}
