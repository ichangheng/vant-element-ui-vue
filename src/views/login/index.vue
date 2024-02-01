<template>
  <div class="login">
    <div class="login-content">
<!--      <button @click="testTC">退出</button>-->
<!--      <button @click="showCP">修改密码</button>-->
      <div class="logo">
        <img src="../../assets/images/logo.png">
      </div>
      <div class="input">
        <input type="text" class="username" placeholder="请输入账号" v-model="loginData.uid">
        <input type="text" class="password" placeholder="请输入密码" v-model="loginData.password">
      </div>
<!--      <div class="remember" @click="rem">-->
<!--        <i class="iconfont" :class="!isRem?'icon-yuanquankong':'icon-yuanquangouxuan'" ref="rem-icon"></i>-->
<!--        <span>记住我</span>-->
<!--      </div>-->
      <div class="submit" @click="login">
        登录
      </div>
    </div>
    <div class="beian">
      <p> Copyright © 2003-2023 欣全鑫</p>
      <p>欣全鑫 All Rights Reserved</p>
      <p>豫ICP备2023006732号</p>
    </div>
    <van-dialog v-model="changePasswordShow" title="修改密码" show-cancel-button @confirm="testCP">
      <van-field v-model="oldpass" label="旧密码" />
      <van-field v-model="newpass"  label="新密码" />
    </van-dialog>
  </div>
</template>
<script>
  import axios from "axios";
  import {Notify} from "vant";

  export default {
    data(){
      return {
        isRem:false,
        changePasswordShow:false,
        oldpass:'',
        newpass:'',
        loginData:{
          uid:'',
          password:'',
        },
        homeData:{
          path:'home',
          isChecked:true,
          i_class:'icon-shouye-copy',
          text:'首页'
        },
      }
    },
    methods:{
      showCP(){
        this.changePasswordShow = true
      },
      testCP(){
        axios.post("http://localhost:8080/user/change?uid="
            +localStorage.getItem("uid")+"&oldPass="+this.oldpass+"&newPass="+this.newpass).then((resp)=>{
          console.log(resp)
          Notify({ type: 'success', message: '修改成功,请重新登录',background:'skyblue' });
          setTimeout(()=>{
            this.$router.push('/login')
          },300)
        })
      },
      testTC(){
        axios.get("http://localhost:8080/login/logout").then((resp)=>{
          console.log(resp)
        })
      },
      rem(){
        this.isRem = !this.isRem
      },
      login(){
        console.log(111)
        axios.post
        ("http://localhost:8080/login/auth?uid="
            +this.loginData.uid +"&password="+this.loginData.password).then((resp)=>{
              if (resp.data.messageCode===200){
                if (localStorage.getItem("groupName")===null||resp.data.groupName!==localStorage.getItem("groupName")){
                  localStorage.setItem("groupName",resp.data.groupName);
                  localStorage.setItem("uid",resp.data.uid);
                  localStorage.setItem("userName",resp.data.userName);
                }
                //记住账号，密码
                if (localStorage.getItem("password")===null||localStorage.getItem("password")!==this.loginData.password){
                  localStorage.setItem("password",this.loginData.password);
                }
                this.$bus.$emit("tohome",this.homeData)
                this.$router.push({
                  path:'/home',
                  query:{
                    groupName:resp.data.groupName,
                    uid:resp.data.uid,
                    userName:resp.data.userName
                  }
                })
              }
          console.log(resp);
        }).catch((error)=>{
          console.log(error)
        })

      }
    },
    mounted() {
      if (localStorage.getItem("uid")!==null){
        console.log(localStorage.getItem("uid")+"------"+localStorage.getItem("password"))
        this.loginData.uid = localStorage.getItem("uid");
        this.loginData.password = localStorage.getItem("password")
      }
    }
  }
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #ffffff;
}
.login-content {
  width: 80%;
  height: 70%;
  margin: auto;
}
.logo {
  width: 100%;
  height: 200px;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 10px;
}
.login img {
  height: 200px;
}
.input {
  width: 100%;
  height: 150px;
  margin-bottom: 40px;
}
.input input{
  box-sizing: border-box;
  width: 80%;
  height: 45px;
  outline: none;
  border-radius: 7px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: none;
  text-align: center;
}
.input input::placeholder {
  text-align: center;

}
.input input:first-child{
  margin-bottom: 20px;
  margin-top: 40px;
}
.remember {
  height: 30px;
  line-height: 30px;
  color: #838282;
}
.remember i {
  font-size: 15px;
  margin-right: 5px;
}
.submit {
  width:90%;
  margin: auto;
  height: 40px;
  line-height: 40px;
  background-color: skyblue;
  margin-top: 15px;
  color: white;
  opacity: 0.8;
}
.beian {
  height: 20%;
  width: 80%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.beian p {
  margin-bottom: 5px;
}
</style>
