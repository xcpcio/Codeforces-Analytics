import { defineConfig } from 'umi';

export default defineConfig({
    title: 'Codeforces Analytics',
    hash: true,
    favicon: 'favicon-16x16.png',
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        { path: '/', component: '@/pages/index', exact: true },
        { path: '/team/:handle_list', component: '@/pages/team', exact: true },
        { path: '/profile/:handle', component: '@/pages/profile', exact: true },
    ],
    publicPath: '/',
});
