<template>
  <div class="me">

    <div class="me-content">
      <div class="header">
        <div class="toux">
          <img :src="picture"><span></span>
        </div>
        <div class="text">
          <p class="name">{{meInfo.name}}</p>
          <p class="group">{{meInfo.group}}</p>
        </div>
<!--        <div class="qiandao" >-->
<!--          <i class="iconfont "-->
<!--             @touchstart.prevent.once="goTouchstart()"-->
<!--             @touchend.prevent.once="goTouchend()"-->
<!--             :class="!isQian?'icon-qiandao1':'icon-qiandao'">-->
<!--          </i>-->
<!--        </div>-->
      </div>
<!--      通知-->
      <div class="notice" @click="tanChuang">
        <div class="notice-left">
          <i class="iconfont icon-tongzhi notice-icon"></i>
          <span class="notice-span">今日通知</span>
        </div>
      </div>
<!--      钱-->
      <div class="money">
        <div class="all-money">
          <div class="left">
            <i class="iconfont icon-xinzi"></i>
            <span>本月目前薪资</span>
          </div>
          <div class="right">
            <span>{{nowMouthMoney}}元</span>
          </div>
        </div>
<!--        <div class="last-day-money">-->
<!--          <div class="left">-->
<!--            <i class="iconfont icon-zuotian"></i>-->
<!--            <span>昨日薪资</span>-->
<!--          </div>-->
<!--          <div class="right">-->

<!--          </div>-->
<!--        </div>-->
      </div>
<!--      功能-->
      <div class="gongneng">
        <div class="tianjia" @click="gototianjia">
          <div class="left">
            <i class="iconfont icon-tianjiadingdan1"></i>
            <span>添加</span>
          </div>
          <div class="right">

          </div>
        </div>
        <div class="chaxun" @click="gotochaxun">
          <div class="left">
            <i class="iconfont icon-data-Inquire"></i>
            <span>查询</span>
          </div>
          <div class="right">

          </div>
        </div>
        <div class="change-password" @click="changePassword(meInfo.uid)">
          <div class="left">
            <i class="iconfont icon-xiugai"></i>
            <span>修改密码</span>
          </div>
        </div>
        <div class="quxiaodenglu" @click="quxiaoqiandao">
          <div class="left">
            <i class="iconfont icon-beizhu"></i>
            <span>取消签到</span>
          </div>
        </div>
        <div class="sctouxiang" @click="sc">
          <div class="left">
            <i class="iconfont icon-yuanquangouxuan"></i>
            <span>上传头像</span>
          </div>
        </div>
      </div>
      <van-dialog v-model="changePasswordShow" title="修改密码" show-cancel-button @confirm="change">
        <van-field v-model="oldpass" label="旧密码" placeholder="请输入旧密码" />
        <van-field v-model="newpass"  label="新密码" placeholder="请输入新密码"/>
      </van-dialog>
      <van-dialog v-model="sctouxiang" title="上传头像(这里是默认头像，点击右上角×号更换)" show-cancel-button @confirm="sctx" >
        <van-uploader  v-model="fileList"  multiple :max-count="1" :after-read="afterRead"/>
      </van-dialog>
<!--      注销-->
      <div class="zhuxiao" @click="zhuxiao">
        <div class="left">
          <i class="iconfont icon-zhuxiao"></i>
          <span>注销</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import { Notify } from 'vant';
import axios from "axios";
  export default {
    data(){
      return {
        nowMouthMoney:0,
        isQian:false,
        meInfo:{
          name:'',
          group:'',
          uid:0
        },
        timeOut:0,
        changePasswordShow:false,
        quxiaoqiandaoShow:false,
        oldpass:'',
        newpass:'',
        chaxun:{
          path:'query',
          isChecked:false,
          i_class:'icon-data-Inquire',
          text:'查询'
        },
        tianjia:{
          path:'add',
          isChecked:false,
          i_class:'icon-tianjiadingdan1',
          text:'添加'
        },
        homeData:{
          path:'home',
          isChecked:true,
          i_class:'icon-shouye-copy',
          text:'首页'
        },
        sctouxiang:false,
        fileList: [
          {
            url:'https://img01.yzcdn.cn/vant/leaf.jpg'
          }
        ],
        file:'',
        picture:'',
      }
    },
    methods:{
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        this.file = file.file;
        console.log(this.file)
      },

      sc(){
        this.sctouxiang = true
      },
      sctx(){
        const formData = new FormData()
        formData.append("file",this.file)
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        axios.post("http://localhost:8080/avatar/upload",formData,config).then((resp)=>{
          console.log(resp)
          if (resp.data.message==='上传成功！'){
            Notify({ type: 'success', message: '上传头像成功',background:'skyblue' });
            this.$router.push('/home')
            this.$bus.$emit("tohome",this.homeData)
          }else {
            Notify({ type: 'success', message: '上传头像失败',background:'skyblue' });
          }
        })
      },
      quxiaoqiandao(){
        Dialog.confirm({
          title: '确认取消？',
        }).then(() => {
              axios.get("http://localhost:8080/attendance/cancel?uid="+this.meInfo.uid).then((resp)=>{
                console.log(resp)
                this.$router.push('/home')
                this.$bus.$emit("tohome",this.homeData)
                Notify({ type: 'success', message: '修改成功,请重新签到',background:'skyblue' });
              })
            })
            .catch(() => {
              // on cancel
            });
      },
      gotochaxun(){
        this.$bus.$emit("tochaxun",this.chaxun)
        this.$router.push('/query')
      },
      gototianjia(){
        this.$bus.$emit("totianjia",this.tianjia)
        this.$router.push('/add')
      },
      change(){
        axios.post("http://localhost:8080/user/change?uid="
            +localStorage.getItem("uid")+"&oldPass="+this.oldpass+"&newPass="+this.newpass).then((resp)=>{
          console.log(resp)
          if (resp.data == 2){
            Notify({ type: 'success', message: '用户不存在或原密码错误',background:'skyblue' });
          }else if(resp.data == -1){
            Notify({ type: 'success', message: '请填写完整',background:'skyblue' });
          }else {
            Notify({ type: 'success', message: '修改成功,请重新登录',background:'skyblue' });
            setTimeout(()=>{
              this.$router.push('/login')
            },300)
          }
        })
      },
      getMonthFirstDay(){
        let y = new Date().getFullYear(); //获取年份
        let m = new Date().getMonth() + 1; //获取月份
        let d = "01";
        m = m < 10 ? "0" + m : m; //月份补 0
        return [y, m, d].join("-");
      },
      getNowDay(){
        let date = new Date(),
            year = date.getFullYear(), //获取完整的年份(4位)
            month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
            strDate = date.getDate() // 获取当前日(1-31)
        if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
        if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0
        return `${year}-${month}-${strDate}`
      },
      qianDao(){
        this.isQian = true;
        Notify({ type: 'success', message: '签到成功',background:'skyblue' });
      },

      goTouchstart() {
        let _this = this;
        clearTimeout(_this.timeOutEvent);
        _this.timeOutEvent = setTimeout(function() {
          _this.timeOutEvent = 0;

          Notify({ type: 'success', message: '长按签到成功',background:'skyblue' });
          _this.isQian = true;
        }, 600);
      },
//手如果在600毫秒内就释放，则取消长按事件
      goTouchend() {
        let _this = this;
        clearTimeout(_this.timeOutEvent);
        if (_this.timeOutEvent !== 0) {
          //  处理单击事件
          _this.isQian = true;
          Notify({ type: 'success', message: '短按签到成功',background:'skyblue' });
        }
      },
      tanChuang(){
        axios.get("http://localhost:8080/notice/getNew").then((resp)=>{
          console.log(resp)
          Dialog.alert({
            title: '今日通知',
            message: resp.data.content,
          }).then(() => {
            // on close
          });
        }).catch((error)=>{
        })
      },
      changePassword(uid){
        this.changePasswordShow = true;
      },
      zhuxiao(){
        Dialog.confirm({
          title: '确认退出？',
        })
            .then(() => {
              axios.get("http://localhost:8080/login/logout").then((resp)=>{
                console.log(resp)
                this.$router.push('/login')
              })
            })
            .catch(() => {
              // on cancel
            });
      },
    },
    mounted() {
      this.meInfo.name = localStorage.getItem("userName");
      this.meInfo.group = localStorage.getItem("groupName");
      this.meInfo.uid = localStorage.getItem("uid");
      axios.get("http://localhost:8080/workRecord/selectByTime?"+"start="+this.getMonthFirstDay()+"&end="+this.getNowDay()+"&pageNum=1&pageSize=10").then((resp)=>{
        this.nowMouthMoney = resp.data.total
      })
      axios.get("http://localhost:8080/avatar/getByUid?uid="+this.meInfo.uid,{responseType:'blob'}).then((resp)=>{
        console.log(resp)
        let reader = new FileReader()
        reader.onload = (e) => {
          this.picture = e.target.result
        }
        reader.readAsDataURL(resp.data)
      })
    }
  }
</script>
<style scoped>
.me-content {
  width: 95%;
  height: 100px;
  margin: auto;
  /*background-color: #55a532;*/
  margin-top: 20px;
}
span {
  font-family: "Arial Black",serif ;
}
.header {
  background-color: white;
  width: 100%;
  height: 100px;
  /*background-color: #f2f2f2;*/
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
.header>div{
  float: left;
}
.toux {
  width: 30%;
  height: 100px;
  text-align: center;

}
.toux img {
  height: 80%;
  width: 80%;
  border-radius: 15%;
  display: inline-block;
  vertical-align: middle;
}
.toux span {
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
.text {
  height: 100px;
  width: 50%;
}
.text>p {
  height: 50px;
  line-height: 50px;
  text-align: left;
  margin-left: 30px;
  font-family: "Arial Black",serif ;
}
.text .name{
  font-size: 30px;
}
.text .group{
  line-height: 40px;
  font-size: 18px;
}
.qiandao {
  width: 20%;
  height: 100px;
}
.qiandao i{
  line-height: 100px;
  font-size: 30px;
}
.notice {
  width: 100%;
  height: 60px;
  background-color: white;
  border-radius: 3px;
  line-height: 60px;
  text-align: center;
  margin-top: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
.notice-left {

}
.notice-span {
  font-family: "Arial Black",serif ;
}
.notice-icon {
  font-size: 25px !important;
  margin-right: 5px;
}
.left {
  width: 40%;
  height: 40px;
  float: left;
  text-align: left ;
  margin-left: 20px;
}
.left i {
  font-size: 20px;
}
.left span{
  font-family: "Arial Black",serif ;
  margin-left: 5px;
}
.money {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
.money>div {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.gongneng {
  width: 100%;
  height: 250px;
  background-color: white;
  margin-top: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);

}
.gongneng>div {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.zhuxiao {
  width: 100%;
  height: 50px;
  background-color: white;
  color: red;
  margin-top: 10px;
  line-height: 50px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
</style>
