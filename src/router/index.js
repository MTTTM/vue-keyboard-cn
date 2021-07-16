import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes.js'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
});

