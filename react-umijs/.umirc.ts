import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/home/:id', component: '@/pages/home' },
    { path: '/dva', component: '@/pages/dva' },
    { path: '/login', component: '@/layouts/index',
      routes: [
        { path: '/login/list', component:'@/pages/list' },
        { path: '/login/profile', component:'@/pages/profile' }
      ]
    },
    { path: '/users/:id', component: '@/pages/users/[id]',
      wrappers: [
        '@/pages/wrappers/auth'
      ],
      routes: [
        { path: '/users/:id/one', component: '@/pages/users/[id]' },
        { path: '/users/two', component: '@/pages/index' },
      ]
    },
    { path: '/about/:id?', component: '@/pages/about/[id$]' },
    {component:'404'}
  ],
  fastRefresh: {},
});
