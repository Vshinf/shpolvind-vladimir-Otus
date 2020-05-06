import Vue from 'vue';
import store from './store/index';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Fragment from 'vue-fragment';
import router from './router/index';

import { BootstrapVue } from 'bootstrap-vue';//, IconsPlugin
Vue.use(BootstrapVue);
//Vue.use(IconsPlugin);

Vue.config.productionTip = false;
Vue.use(Fragment.Plugin);

new Vue({
	store,
	router,
    render: h => h(App),
}).$mount('#app');
