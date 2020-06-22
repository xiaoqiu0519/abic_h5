import Vue from 'vue'
import App from './App.vue'
import 'swiper/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
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

Vue.use(VueAwesomeSwiper)
Vue.prototype.loadingflag = function(flag) {
    store.dispatch('ChangeLoadingAsy', flag)
}

Vue.filter('formatnum', (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})
Vue.filter('formatDate',(dateStr, pattern = '')=>{
    var dt = new Date(dateStr)
    var yy = dt.getFullYear()
    var mm = dt.getMonth() < 9 ? '0' + (Number(dt.getMonth()) + 1) : dt.getMonth()
    var dd = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate()
    var h = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()
    var m = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes()
    var s = dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds()
    if (pattern.toLowerCase() === 'yyyy-mm-dd') {
        return yy + '-' + mm + '-' + dd
    } else {
        return yy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s
    }
})
let LANGUAGETYPE = ''
if(sessionStorage.getItem('languagetype') == 0 || sessionStorage.getItem('languagetype')){
    LANGUAGETYPE = sessionStorage.getItem('languagetype'); 
}else{
    if(location.host.includes('abicrealty')){
        LANGUAGETYPE = 1
    }else{
        LANGUAGETYPE = 0
    }
}
sessionStorage.setItem('languagetype', LANGUAGETYPE)
store.dispatch('ChangeLangugaeAsy', LANGUAGETYPE);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')