import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        language: 1, // 1中文 2英文
        loading: false,
        layoutArr: {
            0: {
                1: '单间',
                2: '1室1厅',
                3: '2室1厅',
                4: '3室1厅',
                5: '别墅',
            },
            1: {
                1: 'Studio',
                2: '1BR',
                3: '2BR',
                4: '3BR',
                5: 'House'
            }
        },
        furnitureArr: {
            0: {
                1: '洗衣机',
                2: '热水器',
                3: '冰箱',
                4: '电视机',
                5: '桌椅',
                6: '沙发',
                7: '床',
                8: '空调',
                9: '无',
                
            },
            1: {
                1: 'Washing Machine',
                2: 'Water Heater',
                3: 'Refrigerator',
                4: 'TV',
                5: 'Table&Chair',
                6: 'Sofa',
                7: 'Bed',
                8: 'Aircon',
                9: 'None',
                
            }
        },
        surroundingArr: {
            0: {
                1: '健身房',
                2: '游泳池',
                3: '篮球场',
                4: '儿童乐园'
            },
            1: {
                1: 'Gym',
                2: 'Swimming poll',
                3: 'Basketball Court',
                4: 'Kids playground'
            }
        },
        usedArr: {
            0: {
                1: '公寓',
                2: '办公室',
                3: '旺铺',
                4: '土地'
            },
            1: {
                1: 'condo',
                2: 'office',
                3: 'commercial space',
                4: 'land'
            }
        },
        faceToArr: {
            0: {
                1: '东',
                2: '南',
                3: '西',
                4: '北',
                5: '其它'
            },
            1: {
                1: 'East',
                2: 'South',
                3: 'West',
                4: 'North',
                5: 'Others'
            }
        },
        paymentArr: {
            0: {
                1: { // 买卖
                    5: '一次性现金',
                    6: '银行贷款',
                },
                2: { // 租赁
                    1: '压2付2+支票',
                    2: '压2付6',
                    3: '压2付12',
                    4: '其他'
                },
            },
            1: {
                1: { // 买卖
                    5: 'cash',
                    6: 'bank financing',
                },
                2: { // 租赁
                    1: '2+2+PDC',
                    2: '2+6',
                    3: '2+12',
                    4: 'others'
                },
            }
        },
        cityparams: '',
    },
    getters: {
        getlanguage(state) {
            return state.language;
        },
        getloading(state) {
            return state.loading
        },
        layoutArr(state) {
            return state.layoutArr
        },
        furnitureArr(state) {
            return state.furnitureArr
        },
        surroundingArr(state) {
            return state.surroundingArr
        },
        usedArr(state) {
            return state.usedArr
        },
        faceToArr(state) {
            return state.faceToArr
        },
        paymentArr(state) {
            return state.paymentArr
        },
        cityparamsstore(state) {
            return state.cityparams
        }
    },
    mutations: {
        //更换语言
        ChangeLangugae(state, num) {
            return state.language = num;
        },
        ChangeLoaing(state, flag) {
            return state.loading = flag;
        },
        setcityparamsstore(state, str) {
            return state.cityparams = str;
        }
    },
    actions: {
        //更换语言
        ChangeLangugaeAsy(context, LANGUAGETYPE) {
            context.commit('ChangeLangugae', LANGUAGETYPE)
        },
        ChangeLoadingAsy(context, flag) {
            context.commit('ChangeLoaing', flag)
        },
        cityparamsstoreAsy(context, str) {
            context.commit('setcityparamsstore', str)
        }
    },
    modules: {}
})