import { defineConfig } from 'umi';
import CONFIG from './config';

export default defineConfig({
    title: CONFIG.title,
    hash: true,
    favicon: CONFIG.favicon,
    analytics: CONFIG.analytics,
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        { path: '/', component: '@/pages/index', exact: true },
        { path: '/team/:handle_list', component: '@/pages/team', exact: true },
        { path: '/profile/:handle', component: '@/pages/profile', exact: true },
    ],
    publicPath: CONFIG.publicPath,
});
