import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Fragment from 'vue-fragment';

Vue.config.productionTip = false;
Vue.use(Fragment.Plugin);

new Vue({
    render: h => h(App),
}).$mount('#app');
