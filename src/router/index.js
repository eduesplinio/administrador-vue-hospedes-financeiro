import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import HospedesView from '@/views/HospedesView.vue';
import FinancasView from '@/views/FinancasView.vue';
import PagamentosView from '@/views/PagamentosView.vue';
import LembretesView from '@/views/LembretesView.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/hospedes', name: 'Hospedes', component: HospedesView },
  { path: '/financas', name: 'Financas', component: FinancasView },
  { path: '/pagamentos', name: 'Pagamentos', component: PagamentosView },
  { path: '/lembretes', name: 'Lembretes', component: LembretesView }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
