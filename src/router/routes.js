const routes = [
  {
    path: '/',
    component: () => import('src/layouts/mainLayout.vue'),
    children: [
      { name: "photography", path: '', alias: ['photography', 'p'], meta: { requiresAuth: false }, component: () => import('src/pages/photography.vue') },
      { name: "photoBooth", path: 'photoBooth', alias: 'pb', meta: { requiresAuth: false }, component: () => import('src/pages/photoBooth.vue') },
      { name: "contactUs", path: 'contactUs', alias: 'pb', component: () => import('src/pages/contactUs.vue') },
    ]
  },
  //Do not delete
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/errorNotFound.vue')
  }
]

export default routes;