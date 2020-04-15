import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        language: 1, // 1中文 2英文
        loading: false
    },
    getters: {
        getlanguage(state) {
            return state.language;
        },
        getloading(state) {
            return state.loading
        }
    },
    mutations: {
        //更换语言
        ChangeLangugae(state, num) {
            return state.language = num;
        },
        ChangeLoaing(state, flag) {
            return state.loading = flag;
        }
    },
    actions: {
        //更换语言
        ChangeLangugaeAsy(context, LANGUAGETYPE) {
            context.commit('ChangeLangugae', LANGUAGETYPE)
        },
        ChangeLoadingAsy(context, flag) {
            context.commit('ChangeLoaing', flag)
        }
    },
    modules: {}
})