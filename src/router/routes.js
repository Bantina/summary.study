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
    path: '/voicer',
    component: () => import('../views/Voicer/Voicer.vue')
  },
  {
    path: '/shadow',
    component: () => import('../views/Shadow/Shadow.vue')
  },
  {
    path: '/catalog',
    component: () => import('../views/Catalog/Catalog.vue')
  }
]
