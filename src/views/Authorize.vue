<template>
  <div class="houselist">
    <Header :title="context.navtype[getlanguage][3]"></Header>
    <div class="nav">
        <span :class="{'navcolor':navindex == 0}" @click="clicknav(0)">{{getlanguage == 0 ? "出售" : "Sell"}}</span>
        <span :class="{'navcolor':navindex == 1}" @click="clicknav(1)">{{getlanguage == 0 ? "租赁" : "Rent"}}</span>
    </div>
    <div class="houseform">
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].username}}</span>
            <input type="text" v-model="username" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].username">
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].telphone}}</span>
            <input type="text" v-model="telphone" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].telphone">
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].email}}</span>
            <input type="text" v-model="email" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].email">
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].title}}</span>
            <input type="text" v-if="getlanguage == 0" v-model="housename.name_c" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].title">
            <input type="text" v-else v-model="housename.name_e" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].title">
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].picture}}</span>
            <UpFile @senddata='getMsgForm' @alertfun='alertfun' ref="ConFile"></UpFile>
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].city}}</span>
            <div class="selectaddress">
              <div class="con" @click="selectflagfun()">
                <span class="selectfontcolor">{{cityname}}  {{addressname}}</span>
                <img class="selectimg" src="../assets/commom/xiala2.png" alt="">
              </div>
            </div>
        </div>
        <div class="inputradio">
            <span><i> * </i> {{tabtext[getlanguage].type}}</span>
            <div class="radiolist">
                <span v-for="(list,index) in usedArr[getlanguage]" :key="index">
                  <input type="radio" v-model="used" :value="index" name="used" id="">{{list}}
                </span>
            </div>
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].tower}}</span>
            <input type="text" v-model="housetower" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].tower">
        </div>
        <div class="inputradio">
            <span><i> * </i> {{tabtext[getlanguage].layout}}</span>
            <div class="radiolist">
                <span v-for="(list,index) in layoutArr[getlanguage]" :key="index">
                  <input v-model="layout" :value="index" type="radio" name="layout" id="">{{list}}
                </span>
            </div>
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].size}}</span>
            <input type="text" v-model="size" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].size">
            <i>m²</i>
        </div>
        <div class="inputradio">
            <span><i>  </i> {{tabtext[getlanguage].faceto}}</span>
            <div class="radiolist">
                <span v-for="(list,index) in faceToArr[getlanguage]" :key="index">
                  <input v-model="faceto" :value='index' type="radio" name="faceto" id="">{{list}}
                </span>
            </div>
        </div>
        <div class="inputradio">
            <span><i> * </i> {{tabtext[getlanguage].balcony}}</span>
            <div class="radiolist">
                <span><input v-model="balcony" value="1" type="radio" name="balcony" id="">{{getlanguage==0?'有':'Y'}}</span>
                <span><input v-model="balcony" value="2" type="radio" name="balcony" id="">{{getlanguage==0?'无':'N'}}</span>
            </div>
        </div>
        <div class="inputradio">
            <span><i> * </i> {{tabtext[getlanguage].parking}}</span>
            <div class="radiolist">
              <span><input type="radio" v-model="parking" value="1" name="parking" id="">{{getlanguage==0?'有':'Y'}}</span>
              <span><input type="radio" v-model="parking" value="2" name="parking" id="">{{getlanguage==0?'无':'N'}}</span>
            </div>
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].sellingprice[this.navindex]}}</span>
            <input type="text" v-model="sellingprice" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].sellingprice[this.navindex]">
        </div>
        <div class="inputradio">
            <span><i> * </i> {{tabtext[getlanguage].payment}}</span>
            <div class="radiolist">
                <span v-for="(list,index) in paymentArr[getlanguage][navindex+1]" :key="index">
                  <input v-model="payment" :value="index" type="radio" name="payment" id="">{{list}}
                </span>
            </div>
        </div>
        <div class="textarea">
            <span>{{tabtext[getlanguage].notes}}</span>
            <textarea v-if="getlanguage == 0" v-model="housenotes.notes_c" name="beizhu" placeholder="300字以内"></textarea>
            <textarea v-else v-model="housenotes.notes_e" name="beizhu" placeholder="Within 300 words"></textarea>
        </div>
        <div class="inputradio">
            <span>{{tabtext[getlanguage].furniture}}</span>
            <div class="radiolist">
                <span v-for="(list,index) in furnitureArr[getlanguage]" :key="index">
                  <input type="checkbox" v-model="furniture" :value="index" id="">{{list}}
                </span>
            </div> 
        </div>
        <div class="btn" @click="commit()">{{commitbtn[getlanguage]}}</div>
    </div>
    <div class="alertbox" @touchmove.prevent v-if="alertflag">
        <div class="tip">
          <img src="../assets/commom/tip.png" alt="" srcset="">
          {{tiptext}}
        </div>
    </div>
    <div class="cityshadebox" v-if="selectflag">
      <div class="content">
        <div class="title">
          <span>{{context.areatitle[getlanguage]}}</span>
          <img @click="sharebtn()" class="closed" src="../assets/commom/close1.png" alt="">
        </div>
        <div class="list">
          <div class="left">
            <div :class="{'selectfontcolor':selectcityindex == index}"
              @click="selectcity(list,index)"  v-for="(list,index) in addressArr" :key="index" >
              {{list.label ? list.label : ''}}
            </div>
          </div>
          <div class="right">
            <div :class="{'selectfontcolor':selectaddressindex==index}" 
              @click="selectaddress(list,index)" v-for="(list,index) in addressArr[selectcityindex].children.slice(1)" :key="index">
              {{list.label}}
            </div>
          </div>
        </div>
        <div class="btn">
          <div class="clear" @click="clearbtn()">{{getlanguage == 0 ? '清空' : 'Clear'}}</div>
          <div class="share" @click="sharebtn()">{{getlanguage == 0 ? '确定' : 'Ok'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Header from '../components/header'
import UpFile from '../components/upfile'
export default {
  computed:{
    ...mapGetters([
        'getlanguage',
        'layoutArr',
        'furnitureArr',
        'usedArr',
        'faceToArr',
        'paymentArr'
        ])
  },
  data(){
    return{
        navindex:0,
        selectflag:false,
        cityname:'请选择',
        addressvalue:'',
        selectcityindex:'0',
        selectaddressindex:'0',
        addressname:'',
        addressArr:{},
        pleaseenter:{
            0:'请输入',
            1:'please enter'
        },
        commitbtn:{
            0:'确认提交',
            1:'Submit'
        },
        tiptext:'',
        tabtext:{
            0:{
                  username:'姓名',
                  telphone:'电话',
                  email:'邮箱',
                  title:'楼盘名称',
                  city:'城市',
                  type:'房屋用途',
                  tower:'楼层',
                  layout:'户型',
                  size:'面积',
                  faceto:'朝向',
                  picture:'图片',
                  balcony:'阳台',
                  parking:'车位',
                  sellingprice:{
                    0:'预售价格',
                    1:'预期租金'
                  },
                  payment:"支付方式",
                  notes:'备注',
                  furniture:'家具',
            },
            1:{
                  username:'Name',
                  telphone:'Contact No.',
                  email:'Email',
                  title:'Project Name',
                  city:'City',
                  type:'Type',
                  tower:'Floor',
                  layout:'Unit Type',
                  size:'Size',
                  faceto:'Face to',
                  picture:'Photo',
                  balcony:'Balcony',
                  parking:'Parking Slot',
                  sellingprice:{
                    0:'Selling Price',
                    1:'Rental'
                  },
                  payment:"Payment",
                  notes:'Notes',
                  furniture:'Furniture',
            }
        },
        username:'',
        email:'',
        telphone:'',
        housename:{
          name_c:'',
          name_e:''
        },
        city:'',
        cityvalue:'',
        used:'',
        housetower:'',
        size:'',
        layout:'',
        balcony:'',
        parking:'',
        sellingprice:'',
        payment:'',
        housenotes:{
          notes_c:'',
          notes_e:'',
        },
        faceto:'',
        furniture:[],
        surrounding:[],
        houseintroduction:{
            introduction_c:'',
            introduction_e:''
        },
        citylist:[],
        selectcitylist:[],
        selectedOptions:'',
        citytran:{
            0:{},
            1:{}
        },
        alertflag:false,
        formData:''
    }
  },
  watch:{
    alertflag(){
      if(this.alertflag){
        setTimeout(()=>{
          this.alertflag = false;
        },1500)
      }
    }
  },
  components:{
    Header,
    UpFile
  },
  mounted(){
    this.getcity();
  },
  methods:{
      clicknav(index){
          this.navindex = index;
      },
      getMsgForm(data){
        this.formData = data
      },
      getcity(){
        this.$get('/others/getcity').then((res)=>{
            if(res.error == '0000'){
                this.addressArr = res.data[this.getlanguage].slice(1)
                this.cityname = this.addressArr[0].label
                this.cityvalue = this.addressArr[0].value
                this.addressname = this.addressArr[0].children[1].label
                this.addressvalue = this.addressArr[0].children[1].value
                this.cityparams = this.cityvalue + '-' +this.addressvalue
            }
        })
      },
      selectcity(list,index){
        this.cityname = list.label;
        this.addressname = list.children[0].label == '不限' ? '' : list.children[0].label;
        this.selectaddressindex = 0;
        this.addressvalue = list.children[0].value;
        this.selectcityindex = index;
        this.cityvalue = list.value;

      },
      selectaddress(list,index){
        this.selectaddressindex = index;
        this.addressname = list.label;
        this.addressvalue = list.value
      },
      selectflagfun(){
        this.selectflag = true;
      },
      sharebtn(){
        this.selectflag = false;
        this.cityparams = this.cityvalue + '-' +this.addressvalue
      },
      clearbtn(){
        this.selectcityindex = 0;
        this.selectaddressindex = 0;
        this.cityname = this.addressArr[0].label
        this.cityvalue = this.addressArr[0].value
        this.addressname = this.addressArr[0].children[1].label
        this.addressvalue = this.addressArr[0].children[1].value
      },
      alertfun(){
        this.alertflag = true;
        this.tiptext = this.getlanguage == 0 ? "您上传的图片格式有误，请重新上传~" : "The format of the picture you uploaded is wrong, please upload again~"
      },
      commit(){
          if(!this.username.trim()){
            this.alertflag = true;
            this.tiptext = this.getlanguage == 0 ? "请输入姓名" : "please enter your name"
            return;
          }
          if(!this.telphone.trim()){
            this.alertflag = true;
            this.tiptext = this.getlanguage == 0 ? "请输入电话" : "please enter Contact No."
            return;
          }
          if(!this.email.trim()){
            this.alertflag = true;
            this.tiptext = this.getlanguage == 0 ? "请输入邮箱" : "please enter Email"
            return;
          }
          if(!this.housename.name_c.trim() && !this.housename.name_e.trim()){
            this.alertflag = true;
            this.tiptext = this.getlanguage == 0 ? "请输入楼盘名称" : "please enter Project Name"
            return;
          }
          if(!this.formData || !this.formData.get('images')){
            this.alertflag = true;
            this.tiptext = this.getlanguage == 0 ? "请上传图片" : "Please select photos"
            return;
          }
          if(!this.used){
            this.alertflag = true;
            this.tiptext = this.getlanguage == 0 ? "请选择房屋用途" : "Please select a house type"
            return;
          }
          if(!this.housetower){
            this.alertflag = true;
            this.tiptext = this.getlanguage == 0 ? "请输入 单元号&门牌号" : "please enter Tower/unit no."
            return;
          }
          if(!this.layout){
            this.alertflag = true;

            this.tiptext = this.getlanguage == 0 ? "请选择房屋户型" : "Please select house type"
            return;
          }
          if(!this.size){
            this.alertflag = true;
            this.tiptext = this.getlanguage == 0 ? "请选择房屋面积" : "please enter Size"
            return;
          }
          // if(!this.faceto){
          //   this.alertflag = true;
          //   this.tiptext = this.getlanguage == 0 ? "请选择房屋朝向" : "Please select the house orientation"
          //   return;
          // }
          if(!this.balcony){
            this.alertflag = true;
            this.tiptext = this.getlanguage == 0 ? "请选择是否有阳台" : "Please select whether there is a balcony"
            return;
          }
          if(!this.parking){
            this.alertflag = true;
            this.tiptext = this.getlanguage == 0 ? "请选择是否有车位" : "Please select whether there is a parking"
            return;
          }
          if(!this.sellingprice){
            this.alertflag = true;
            if(this.navindex === 0){
              this.tiptext = this.getlanguage == 0 ? "请输入预售价格" : "please enter Selling Price"
            }else{
              this.tiptext = this.getlanguage == 0 ? "请输入预期租金" : "please enter Rental"
            }
            
            return;
          }
          if(!this.payment){
            this.alertflag = true;
            this.tiptext = this.getlanguage == 0 ? "请选择支付方式" : "Please select mode of payment"
            return;
          }
          if(!this.furniture){
            this.alertflag = true;
            this.tiptext = this.getlanguage == 0 ? "请选择家具" : "Please select furniture"
            return;
          }
          this.loadingflag(true)
          this.formData.append('id','');
          this.formData.append('username',this.username.trim());
          this.formData.append('telphone',this.telphone.trim());
          this.formData.append('email',this.email.trim());
          this.formData.append('title',JSON.stringify(this.housename));
          this.formData.append('city',this.cityparams);
          this.formData.append('cityname',JSON.stringify({
            cityname_c:this.cityname,
            cityname_e:this.cityname,
          }))
          this.formData.append('size',this.size);
          this.formData.append('type',this.navindex == 0 ? '1' : '2');
          this.formData.append('tower',this.housetower);
          this.formData.append('layout',this.layout);
          this.formData.append('faceto',this.faceto);
          this.formData.append('balcony',this.balcony);
          this.formData.append('parking',this.parking);
          this.formData.append('sellingprice',this.sellingprice);
          this.formData.append('payment',this.payment);
          this.formData.append('notes',JSON.stringify(this.housenotes));
          this.formData.append('furniture',JSON.stringify(this.furniture));
          this.formData.append('used',this.used);
          this.formData.append('introduction',JSON.stringify(this.houseintroduction));
          this.formData.append('surrounding',JSON.stringify(this.surrounding));
          this.$post('/house/addhouse',this.formData).then((res)=>{
              this.loadingflag(false)
              if(res.error == '0000'){
                this.alertflag = true;
                this.tiptext = this.getlanguage == 0 ? "提交成功，待后台审核" : "submit successfully"
                setTimeout(()=>{
                  window.location.reload()
                },1200)
              }
            })
      }

  }
}
</script>
<style lang="stylus" scoped>
.houselist
    .nav
        width 100%;
        .navcolor
            background #FFA54F;
            color white;
        span 
            width 0.6rem;
            height 0.3rem;
            display inline-block;
            margin 0.2rem 0.1rem;
            text-align center;
            line-height 0.3rem;
            background: #f8f8f9;
            color: #9399a5;
    .houseform
        width 94%;
        padding 0 3%;
        font-size 0.13rem;
        padding-bottom 0.5rem;
        input[type='checkbox']
        input[type='radio']
            position relative;
            top 0.01rem;
        .inputdiv
            width 100%;
            min-height 0.4rem;
            line-height 0.4rem;
            display flex;
            border-bottom 1px solid #ddd;
            span
                width 1rem;
                i
                    color #f43e5a;
            input
                flex 1;
                border none;
                outline none;
            .selectaddress
              margin-left 0;
              width 2rem;
              span
                width 100%;
                max-width 100%; 
                font-size 0.13rem;
                color #333333;
                font-weight normal;   
        .inputradio
            width 100%;
            line-height 0.4rem;
            display flex;
            border-bottom 1px solid #ddd;
            &>span
                width 1rem;
                i
                    color #f43e5a; 
            .radiolist
                flex 1
                padding 0.08rem 0;
                line-height 0.24rem;
                span
                    display inline-block;
                    margin 0 0.08rem 0 0;                       
        .textarea
            width 100%;
            height 0.7rem;
            line-height 0.7rem;
            display flex;
            border-bottom 1px solid #ddd;
            &>span
                width 1rem;
            textarea
                width 2.5rem;
                height 0.5rem;
                margin-top 0.05rem;
                border 1px solid #ccc;    
                outline none;
                padding 0.04rem;
        .btn
            width 2.6rem;
            height 0.36rem;
            background #ffa54f;
            text-align center;
            line-height 0.36rem;
            margin 0 auto;  
            border-radius 0.1rem;
            margin-top 0.2rem;
            color white;  
</style>