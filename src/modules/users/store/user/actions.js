import userApi from "@/api/userApi"

export const loadUserList =  async ( { commit }, current_page ) => {
    const  { data }  = await userApi.get(`/user?page=${current_page}`)
    commit('setUsers', data)
    commit('isCreated', false)
}

export const loadUserById =  async ( { commit }, id ) => {
    const  { data }  = await userApi.get(`/user/${id}`)
    const user = data.data
    commit('setUsersById', user)
}

export const createUser = async ( {commit}, user) => {
    //console.log(user)
    await userApi.post(`/user`, user)
        .then(res => {
            commit('setUsersById', res.data.data)
            commit('isCreated', true)
        }).catch(err => {
            const errors= err.response.data.errors
            commit('setError', errors)
            commit('isCreated', false)
        })
}

export const deleteUser = async ({commit},id) => {
    await userApi.delete(`/user/${id}`)
    commit('isCreated', false)
}

