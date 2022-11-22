export const routes = [
  {
    name: 'index',
    path: '/',
    component: () => import('@/views/Index.vue'),
    redirect: 'downloading',
    children: [
      {
        name: 'downloading',
        path: '/downloading',
        component: () => import('@/views/downloading/Index.vue'),
        meta: {
          menuName: 'downloading',
        },
      },
      {
        name: 'finished',
        path: '/finished',
        component: () => import('@/views/finished/Index.vue'),
        meta: {
          menuName: 'finished',
        },
      },
      {
        name: 'settings',
        path: '/settings',
        component: () => import('@/views/settings/Index.vue'),
        meta: {
          menuName: 'settings',
        },
      },
    ],
  },
]
