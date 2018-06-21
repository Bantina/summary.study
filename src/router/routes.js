export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('../views/Index/Index.vue')
  },
  {
    path: '/test',
    component: () => import('../views/Test/Test.vue')
  }
]
