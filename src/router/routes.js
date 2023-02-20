const routes = [
  {
    path: '/',
    component: () => import('src/layouts/mainLayout.vue'),
    children: [
      { name: "home", path: '', meta: { requiresAuth: false }, component: () => import('src/pages/home.vue') },
      { name: "signIn", path: 'signIn', alias: 'login', meta: { requiresAuth: false }, component: () => import('src/pages/userAuth/signIn.vue') },
      { name: "signUp", path: 'signUp', alias: 'register', meta: { requiresAuth: false }, component: () => import('src/pages/userAuth/signUp.vue') },
      { name: "account", path: 'user/:uid', meta: { requiresAuth: true }, component: () => import('src/pages/account.vue') },
    ]
  },
  //Do not delete
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/errorNotFound.vue')
  }
]

export default routes;