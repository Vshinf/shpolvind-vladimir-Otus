import Vue from 'vue';
import VueRouter from 'vue-router';
import SettingPage from "@/components/SettingPage";
import Game from "@/components/Game";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{ path: '/', name: 'Settings', component: SettingPage },
		{ path: '/game', name: 'Game', component: Game },
		/*{ path: '/user/:id', component: User }*/
	]
});

export default router;
