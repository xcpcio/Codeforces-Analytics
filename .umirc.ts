import { defineConfig } from 'umi';

export default defineConfig({
    hash: true,
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        { path: '/', component: '@/pages/index', exact: true },
        { path: '/team/:handle_list', component: '@/pages/team', exact: true },
        { path: '/profile/:handle', component: '@/pages/profile', exact: true },
    ],
});
