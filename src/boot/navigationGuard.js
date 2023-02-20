export default ({ app, router, store }) => {
  router.beforeEach((to, from, next) => {
    // console.log("Navigation Guard", to, from);
    next();
  });
};