import userApi from "@/api/userApi"

export const loadUserList =  async ( { commit }, current_page ) => {
    const  { data }  = await userApi.get(`/user?page=${current_page}`)
    commit('setUsers', data)
}

export const loadUserById =  async ( { commit }, id ) => {
    const  { data }  = await userApi.get(`/user/${id}`)
    const user = data.data
    commit('setUsersById', user)
}

