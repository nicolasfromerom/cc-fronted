export const setUsers = ( state, data ) => {
    state.users = [...data.data]
    state.links = data.links
    state.meta = data.meta
}

export const setUsersById = ( state, user ) => {
    state.user = user
}

export const isCreated = ( state, isCreated ) => {
    state.isCreated = isCreated
}

export const setError = ( state, err ) => {
    state.errors = err
}