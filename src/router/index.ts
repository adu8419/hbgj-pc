import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home.vue';
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/export',
    name: 'export',
    meta: {
      title: '导出PDF',
    },
    component: () => import(/* webpackChunkName: "export" */ '../views/export.vue'),
  },
  {
    path: '/majorization',
    name: 'majorization',
    meta: {
      title: '导出PDF',
    },
    component: () => import(/* webpackChunkName: "export" */ '../views/majorization.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '文件上传',
          permiss: '1',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
      },
    ],
  },

  {
    path: '/403',
    name: '403',
    meta: {
      title: '没有权限',
    },
    component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


export default router;
