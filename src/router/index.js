import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/',
    name: 'user-list',
    component: () => import(/* webpackChunkName: "about" */ '@/modules/users/views/UserListView.vue')
  },
  {
    path: '/edit/:id',
    name: 'user-edit',
    component: () => import(/* webpackChunkName: "about" */ '@/modules/users/views/UserEditView.vue'),
    props: ( route ) => {
      return {
          id: route.params.id
      }
    }
  },
  {
    path: '/create',
    name: 'user-create',
    component: () => import(/* webpackChunkName: "about" */ '@/modules/users/views/UserCreateView.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
