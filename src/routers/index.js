import Vue from 'vue';
import VueRouter from 'vue-router';

import Login  from '../views/Login/Index.vue'
import Index  from '../views/Home/Index.vue'


Vue.use(VueRouter);

const routes = [
      {
        path: '/',
        name: '/',
        component: Index,
        meta: {
          allowLogin: true
        }
      },
        {
          path: '/index',
          name: '/index',
          component: Index,
          meta: {
            allowLogin: true
          }
        },
      {
          path: '/login',
          name: 'Login',
          component: Login,
          meta: {
              allowLogin: false
          }
        },
];

const router = new VueRouter({
  routes
});

export default router;
