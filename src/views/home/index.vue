<template>
  <div class="home">
    <van-notice-bar color="black" background="#ffffff" left-icon="volume-o" scrollable>
      通知：{{tongzhi}}
    </van-notice-bar>
    <div class="home-content">
      <div class="header">

        <div class="toux">
          <img :src="picture">
        </div>
        <div class="text">
          <p class="name">{{meInfo.name}}</p>
          <p class="group">{{meInfo.group}}</p>
        </div>
      </div>
      <div class="qiandao-box">
        <div class="qiandao" @click="qianShow">
          <span>{{qiandao}}</span>
        </div>
      </div>
      <van-dialog v-model="qiandaoShow" title="修改密码" show-cancel-button @confirm="qian">
        <van-field
            readonly
            clickable
            name="picker"
            :value="value"
            label="选择签到方式"
            placeholder="点击选择签到方式"
            @click="showPicker = true"
        />
        <van-field v-model="hour" label="加班时长" placeholder="请输入加班时长" :disabled="isjiaban"/>
      </van-dialog>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
        />
      </van-popup>
    </div>
  </div>

</template>
<script>
import axios from "axios";
import {Dialog, Notify} from "vant";

export default {
  data() {
    return {
      nowMouthMoney: 0,
      qiandao:'签到',
      tongzhi:'',
      isQian: false,
      meInfo: {
        name: '苗仁豪f',
        group: '包装组f',
        uid: 0
      },
      message:'',
      flag:0,
      hour:0,
      qiandaoShow:false,
      value: '',
      columns: ['全天签到', '半天签到', '全天签到且加班'],
      isjiaban:true,
      showPicker: false,
      isDone:false,
      picture:'',
    }
  },
  methods:{
    qianShow(){
      if (this.isDone == false){
        this.qiandaoShow = true
      }else {
        Notify({ type: 'warning', message: '已经签到',background:'skyblue' });
      }

    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
      if (this.value === '全天签到且加班'){
        this.isjiaban = false
      }else {
        this.isjiaban = true
      }
    },
    qian(){
      if (this.value === '全天签到'){
        this.flag = 0;
      }else if (this.value === '半天签到'){
        this.flag = 1;
      }else {
        this.flag = 2;
      }
      axios.get("http://localhost:8080/attendance/comin?message="+
          this.message+"&flag="+this.flag+"&hour="+this.hour).then((resp)=>{
        console.log(resp)
      })
      this.qiandao = "已签到"
      this.isDone = true
    }
  },
  mounted() {
    this.meInfo.name = localStorage.getItem("userName");
    this.meInfo.group = localStorage.getItem("groupName");
    this.meInfo.uid = localStorage.getItem("uid");
    axios.get("http://localhost:8080/notice/getNew").then((resp)=>{
      this.tongzhi = resp.data.content;
    })
    axios.get('http://localhost:8080/attendance/isDone').then((resp)=>{
      console.log(resp)
      if (resp.data === 'NOT'){
        this.qiandao = '签到'
      }else {
        this.qiandao = '已签到'
        this.isDone = true
      }
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
.home {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
}
.home-content {
  width: 95%;
  height: 700px;
  margin: auto;
  /*background-color: #55a532;*/
  margin-top: 20px;
  background-color: white;
}
span {
  font-family: "Arial Black",serif ;
}
.header {
  margin-top: 30px;
  background-color: white;
  width: 100%;
  height: 100px;
  /*background-color: #f2f2f2;*/
  /*box-shadow: 0 5px 15px rgba(0,0,0,0.1);*/
}
.header>div{
  float: left;
}
.toux {
  width: 30%;
  height: 100px;
  margin-left: 10%;
}
.toux img {
  height: 100%;
  width: 100%;
  border-radius: 15%;

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
.qiandao-box{
  margin-top: 50px;
  /*background-color: beige;*/
  width: 100%;
  height: 200px;

}
.qiandao {
  width: 200px;
  height: 200px;
  border: 1px #a7a6a6 solid;
  border-radius: 100%;
  margin: auto;
}
.qiandao span {
  text-align: center;
  line-height: 200px;
  font-size: 30px;
}

</style>
