import { createRouter, createWebHistory } from 'vue-router';
import CountdownView from '../views/CountdownView.vue';
import ResultView from '../views/ResultView.vue';
import RegisterView from '../views/RegisterView.vue';
import TargetDayView from '@/views/TargetDayView.vue';

const routes = [
  { path: '/', component: CountdownView },
  { path: '/resultado', component: ResultView },
  { path: '/registrar', component: RegisterView },
  { path: '/fecha-objetivo', component: TargetDayView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
