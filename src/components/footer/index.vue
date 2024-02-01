<template>
  <div class="footer" ref="footer">
    <div v-for="(footitem,index) in footerList" :key="index" @click="selectAndGo(footitem)" >
      <i class="iconfont"  :class="[{'blue':footitem.isChecked},footitem.i_class]" ></i>
      <p :class="{'blue':footitem.isChecked}">{{footitem.text}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      footerList:[
        {
          path:'home',
          isChecked:true,
          i_class:'icon-shouye-copy',
          text:'首页'
        },
        {
          path:'query',
          isChecked:false,
          i_class:'icon-data-Inquire',
          text:'查询'
        },
        {
          path:'add',
          isChecked:false,
          i_class:'icon-tianjiadingdan1',
          text:'添加'
        },
        {
          path:'me',
          isChecked:false,
          i_class:'icon-shouye',
          text:'我的'
        },
      ]
    }
  },
  methods:{
    selectAndGo(footitem){
      this.footerList.forEach((item)=>{
        item.isChecked = false
      })
      footitem.isChecked = true;
      this.$router.push({
        path:`/${footitem.path}`,
        query:{}
      })
    },
    selectAndGosp(footitem){
      this.footerList.forEach((item)=>{
        item.isChecked = false
      })
      this.footerList.forEach((item)=>{
        if (item.path === footitem.path){
          item.isChecked = true;
        }
      })
    },

  },
  mounted() {
    let _this = this
    this.$bus.$on("totianjia",(data)=>{
      _this.selectAndGosp(data)
    })
    this.$bus.$on("tochaxun",(data)=>{
      _this.selectAndGosp(data)
    })
    this.$bus.$on("tohome",(data)=>{
      _this.selectAndGosp(data)
    })
  }
}
</script>
<style scoped>
.footer {
  background-color: white;
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
}
.footer div {
  float: left;
  width: 25%;
  height: 70px;
  position: relative;
  /*line-height: 60px;*/
}
.footer i {
  font-size: 22px;
  position: relative;
  top: 10px;
  color: #a6a4a4;
}
.footer p{
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
  font-family: "Arial Black",serif ;
  color: #636262;
}
.blue {
  color: skyblue !important;
}
</style>
