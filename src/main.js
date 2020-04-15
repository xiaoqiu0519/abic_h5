import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './css/commom.css'
import './css/commom.styl'
import { ChangeResize } from './js/commom';
ChangeResize(window, document);
import context from './js/context';
import {get, post } from './js/config';

Vue.prototype.context = context;
Vue.config.productionTip = false;
Vue.prototype.$get = get;
Vue.prototype.$post = post;


Vue.prototype.loadingflag = function(flag) {
    store.dispatch('ChangeLoadingAsy', flag)
}

Vue.filter('formatnum', (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})


let LANGUAGETYPE = (sessionStorage.getItem('languagetype') || sessionStorage.getItem('languagetype') == 0) ?
    sessionStorage.getItem('languagetype') : 0; //0中文   1英文  
sessionStorage.setItem('languagetype', LANGUAGETYPE)
store.dispatch('ChangeLangugaeAsy', LANGUAGETYPE);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')