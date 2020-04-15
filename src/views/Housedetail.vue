<template>
  <div class="housedetail">
    <Header :title="housedetail[getlanguage]"></Header>
    <div class="detail">
        <div class="houseimg">
           
        </div>
        <div class="detaillist">
            <div class="housetitle">{{housedetaildata.title}}</div>
            <div  class='house-intro'>
                <ul v-if="housedetaildata">
                
                    <li>
                        <span class="type">{{context.housedesc[getlanguage].allprice}}：</span> 
                        <span class="spec">
                            {{housedetaildata.sellingprice | formatnum}} {{housedetaildata.type == 2 ? " p/月" : " p"}}
                        </span>
                    </li>
                    
                    <li>
                        <span class="type">{{context.housedesc[getlanguage].layout}}：</span>
                        <span class="spec"> {{layoutArr[getlanguage][housedetaildata.layout]}}</span>
                    </li>
                    <li>
                        <span class="type">{{context.housedesc[getlanguage].size}}：</span> 
                        <span class="spec">{{housedetaildata.size}} ㎡</span>
                    </li>
                    <li>
                        <span class="type">{{context.housedesc[getlanguage].faceTo}}：</span> 
                        <span>{{faceToArr[getlanguage][housedetaildata.faceto]}}</span> 
                    </li>
                    
                    <li>
                        <span class="type">{{context.housedesc[getlanguage].tower}}：</span> 
                        <span>T2 2110</span> 
                    </li>
                    <li>
                        <span class="type">{{context.housedesc[getlanguage].paymentterm}}：</span> 
                        <span>{{paymentArr[getlanguage][housedetaildata.type][housedetaildata.payment]}}</span>
                    </li>
                    <li>
                        <span class="type">{{context.housedesc[getlanguage].balcony}}：</span> 
                        <span v-if="getlanguage == 0">{{housedetaildata.balcony == 1? '有' : '无'}}</span>
                        <span v-else>{{housedetaildata.balcony == 1? 'Y' : 'N'}}</span>
                    </li>
                      
                    <li>
                        <span class="type">{{context.housedesc[getlanguage].parkingslot}}：</span> 
                        <span v-if="getlanguage == 0">{{housedetaildata.parking == 1? '有' : '无'}}</span>
                        <span v-else>{{housedetaildata.parking == 1? 'Y' : 'N'}}</span>
                    </li>
                    <li>
                        <span class="type">{{context.housedesc[getlanguage].use}}：</span> 
                        <span>{{usedArr[getlanguage][housedetaildata.used]}}</span>
                    </li>
                   
                    <li class="full">
                        <span class="type">{{context.housedesc[getlanguage].furniture}}：</span>
                        <p>
                            <i v-for="(list,index) in JSON.parse(housedetaildata.furniture)" :key="index">
                                {{furnitureArr[getlanguage][list]}}、
                            </i> 
                        </p>
                        
                    </li>
                   
                    <li class="full">
                        <span class="type">{{context.housedesc[getlanguage].surrounding}}：</span>
                        <p>
                            <i v-for="(list,index) in JSON.parse(housedetaildata.surrounding)" :key="index">
                                {{surroundingArr[getlanguage][list]}}、
                            </i> 
                        </p>
                    </li>
                    <li class="full">
                        <span class="type">{{context.housedesc[getlanguage].notes}}：</span>
                        <span>{{housedetaildata.notes}}</span> 
                    </li>
                    
                    <li class="full">
                        <span class="type">{{context.housedesc[getlanguage].introduction}}：</span>
                        <span>{{housedetaildata.introduction}}</span> 
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Header from '../components/header'
export default {
  computed:{
    ...mapGetters(['getlanguage'])
  },
  data(){
    return{
      housedetail:{0:'房屋详情',1:'House Details'},
      housedetaildata:'',
      layoutArr:{
            0:{
              1:'单间',
              2:'1室1厅',
              3:'2室1厅',
              4:'3室1厅',
              5:'其它',
            },
            1:{
              1:'studio',
              2:'1BR',
              3:'2BR',
              4:'3BR',
              5:'others'
            }
          },
          paymentArr:{
            0:{
              1:{ // 买卖
                1:'一次性现金',
                2:'银行贷款',
                3:'其他',
              },
              2:{ // 租赁
                1:'压2付6',
                2:'压2付12',
                3:'压2付2+预付支票',
                4:'其他'
              },
              3:{
                1:'一次性现金',
                2:'银行贷款',
                3:'其他',
              }
            },
            1:{
              1:{ // 买卖
                1:'cash',
                2:'bank financing',
                3:'others',
              },
              2:{ // 租赁
                1:'2+6',
                2:'2+12',
                3:'2+2+PDc',
                4:'others'
              },
              3:{
                1:'cash',
                2:'bank financing',
                3:'others',
              }
            }
          },
          furnitureArr:{
              0:{
                1:'洗衣机',
                2:'热水器',
                3:'冰箱',
                4:'电视机',
                5:'桌椅',
                6:'沙发',
                7:'茶几',
                8:'床',
                9:'空调'
            },1:{
                1:'washing machine',
                2:'water heater',
                3:'ref',
                4:'TV',
                5:'Table&chair',
                6:'sofa',
                7:'center table',
                8:'bed',
                9:'aircon'
            }
          },
          surroundingArr:{
              0:{
                  1:'学校',
                  2:'超市',
                  3:'健身房',
                  4:'公园'
              },
              1:{
                  1:'School',
                  2:'Mall',
                  3:'Gym',
                  4:'Park'
              }
          },  
          usedArr:{
            0:{
              1:'公寓',
              2:'办公室',
              3:'旺铺',
              4:'土地'
            },
            1:{
              1:'condo',
              2:'office',
              3:'commercial space',
              4:'land'
            }
          },
          faceToArr:{
            0:{
                1:'东',
                2:'南',
                3:'西',
                4:'北'
            },
            1:{
                1:'East',
                2:'South',
                3:'West',
                4:'North'
            }  
          }
           
    }
  },
  components:{
    Header,
  },
  mounted(){    
      this.housedetaildata = sessionStorage.getItem('sesshousedetail') ? JSON.parse(sessionStorage.getItem('sesshousedetail')) : ''
  }
}
</script>
<style lang="stylus" scoped>
.housedetail
    .detail
        .houseimg
            width 100%;
            height 2rem;
            text-align center;
            img
                width 100%;
                height 2rem;
        .detaillist
            width 94%;
            margin 0 3%;
            .housetitle
                width 100%;
                font-size 0.18rem;
                font-weight 600; 
                margin 0.15rem 0; 
            .house-intro
                margin 0.2rem auto 0;
                font-size 0.12rem;
                ul
                    display flex;
                    flex-wrap wrap;
                    li
                        width 50%;
                        margin-bottom 0.06rem;
                        line-height 0.2rem;
                        display flex;
                        span
                            display inline-block;
                    .type
                        color #999;
                        max-width 1.2rem;
                        min-width 0.6rem;
                    .full 
                        width 100% !important; 
                        &>span:nth-child(2)
                            width 80%;   
                    .spec
                        color #fa5741;
                        font-weight 600;          
</style>