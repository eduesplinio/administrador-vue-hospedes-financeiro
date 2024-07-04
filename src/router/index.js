import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ClientTable from '@/components/clients/ClientTable.vue';
import ClientManager from '@/views/ClientManager.vue';
import ProductTable from '@/components/products/ProductTable.vue';
import NotFoundComponents from '@/views/NotFoundComponents.vue';
import MinhasTarefas from '@/views/MinhasTarefas.vue';
import MeusAgendamentos from '@/views/MeusAgendamentos.vue';
import ForumEmpresa from '@/views/ForumEmpresa.vue';
import FeedbackEmpresa from '@/views/FeedbackEmpresa.vue';
import FinancasView from '@/views/FinancasView.vue';
import HospedesView from '@/views/HospedesView.vue';
import PagamentosView from '@/views/PagamentosView.vue';
import LembretesView from '@/views/LembretesView.vue';
import FlatsView from '@/views/FlatsView.vue';
// import LoginUser from '@/views/LoginUser.vue';


Vue.use(Router);

// // Verifica se o usuário está logado
// function isLoggedIn() {
//     return !!localStorage.getItem('userToken');
// }

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        // {
        //     path: '/login',
        //     name: 'loginUser',
        //     component: LoginUser
        // },
        {
            path: '/',
            name: 'homeView',
            component: HomeView,
        },
        {
            path: '/financas',
            name: 'financas',
            component: FinancasView,
        },
        {
            path: '/hospedes',
            name: 'hospedes',
            component: HospedesView,
        },
        {
            path: '/lembretes',
            name: 'lembretes',
            component: LembretesView,
        },
        {
            path: '/pagamentos',
            name: 'pagamentos',
            component: PagamentosView,
        },
        {
            path: '/flats',
            name: 'flats',
            component: FlatsView,
        },
        {
            path: '/minhasTarefas',
            name: 'minhasTarefas',
            component: MinhasTarefas,
        },
        {
            path: '/meusAgendamentos',
            name: 'meusAgendamentos',
            component: MeusAgendamentos,
        },
        {
            path: '/feedbackEmpresa',
            name: 'FeedbackEmpresa',
            component: FeedbackEmpresa,
        },
        {
            path: '/forumEmpresa',
            name: 'forumEmpresa',
            component: ForumEmpresa,
        },
        {
            path: '/clientes',
            name: 'Clientes',
            component: ClientTable,
        },
        {
            path: '/gerenciar-clientes',
            name: 'clientManager',
            component: ClientManager,
        },
        {
            path: '/produtos',
            name: 'Produtos',
            component: ProductTable,
        },
        {
            path: '/404',
            alias: '*',
            name: 'NotFound',
            component: NotFoundComponents
        }
    ]
});

// // Guard global para verificar a autenticação antes de cada navegação de rota (Navegation Guard)
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn()) {
//         next({ name: 'loginUser' });
//     } else {
//         next();
//     }
// });

export default router;
