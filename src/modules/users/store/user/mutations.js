export const setUsers = ( state, data ) => {
    state.users = [...data.data]
    state.links = data.links
    state.meta = data.meta
}

export const setUsersById = ( state, user ) => {
    state.user = user
}

