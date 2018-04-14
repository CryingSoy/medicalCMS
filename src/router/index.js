import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/', component: () => import('@/views/external/index'), hidden: true },
  { path: '/queryInfo', component: () => import('@/views/external/queryInfo/index'), hidden: true },

  {
    path: '/dashboard',
    component: Layout,
    // hidden: true,
    children: [{
      path: '',
      // name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/auth',
    component: Layout,
    children: [{
      path: 'index',
      name: 'auth',
      component: () => import('@/views/auth/index'),
      meta: { title: '权限管理（开发）', icon: 'component' }
    }]
  },

  {
    path: '/test',
    component: Layout,
    children: [{
      path: 'index',
      name: 'test',
      component: () => import('@/views/test/index'),
      meta: { title: '测试（开发）', icon: '404' }
    }]
  },

  {
    path: '/statistics',
    component: Layout,
    redirect: 'noredirect',
    name: 'statistics',
    meta: { title: '统计', icon: 'example' },
    children: [
      {
        path: 'usedcount',
        name: 'usedcount',
        component: () => import('@/views/statistics/usedcount/index'),
        meta: { title: '药品消耗统计' }
      },
      {
        path: 'flowcount',
        name: 'flowcount',
        component: () => import('@/views/statistics/flowcount/index'),
        meta: { title: '药品流向统计' }
      },
      {
        path: 'treatcount',
        name: 'treatcount',
        component: () => import('@/views/statistics/treatcount/index'),
        meta: { title: '就诊人数统计' }
      },
      {
        path: 'usedmoneycount',
        name: 'usedmoneycount',
        component: () => import('@/views/statistics/usedmoneycount/index'),
        meta: { title: '药品流水金额统计' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    name: 'user',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'admininfo',
        name: 'admininfo',
        component: () => import('@/views/user/admin-user/index'),
        meta: { title: '管理员', icon: 'people' }
      },
      {
        path: 'doctorinfo',
        name: 'doctorinfo',
        component: () => import('@/views/user/doctor-user/index'),
        meta: { title: '校医', icon: 'table' }
      },
      {
        path: 'studentinfo',
        name: 'studentinfo',
        component: () => import('@/views/user/student-user/index'),
        meta: { title: '学生', icon: 'peoples' }
      },
      {
        path: 'teacherinfo',
        name: 'teacherinfo',
        component: () => import('@/views/user/teacher-user/index'),
        meta: { title: '教师', icon: 'user' }
      }
    ]
  },

  {
    path: '/drugs',
    component: Layout,
    redirect: 'noredirect',
    name: 'drugs',
    meta: { title: '药品管理', icon: 'form' },
    children: [
      {
        path: 'input',
        name: 'drugsInput',
        component: () => import('@/views/drugs/drugsInput/index'),
        meta: { title: '药品入库', icon: 'shoppingCard' }
      },
      {
        path: 'info',
        name: 'drugsInfo',
        component: () => import('@/views/drugs/drugsInfo/index'),
        meta: { title: '药品查询', icon: 'tree' }
      }
    ]
  },

  {
    path: '/dictionary',
    component: Layout,
    redirect: 'noredirect',
    name: 'dictionary',
    meta: { title: '字典表管理', icon: 'manage' },
    children: [
      {
        path: 'classify',
        name: 'classify',
        component: () => import('@/views/dictionary/classify/index'),
        meta: { title: '药品归属', icon: 'classify' }
      },
      {
        path: 'disease',
        name: 'disease',
        component: () => import('@/views/dictionary/disease/index'),
        meta: { title: '病情症状', icon: 'disease' }
      }
    ]
  },

  {
    path: '/treat',
    component: Layout,
    children: [{
      path: 'index',
      name: 'treat',
      component: () => import('@/views/treat/index'),
      meta: { title: '就诊', icon: 'treat' }
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

