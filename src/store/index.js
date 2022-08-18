import { createStore } from 'vuex'
import user from '@/modules/users/store/user'

export default createStore({
  modules: {
    user
  }
})
