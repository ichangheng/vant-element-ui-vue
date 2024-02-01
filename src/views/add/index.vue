<template>
  <div class="waibao">
    <div class="add">
      <div class="header">
        <p>欢迎您{{name}} 您在{{group}}</p>
      </div>
      <div class="gongneng">
        <div class="tianjia">
          <div class="left">
            <i class="iconfont icon-shafa"></i>
            <span>家具</span>
          </div>
          <div class="right">
            <van-field
                readonly
                clickable
                name="picker"
                :value="addData.objectName"
                placeholder="点击选择家具"
                @click="showPicker = true"
            />
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
        <div class="chaxun">
          <div class="left">
            <i class="iconfont icon-shuliang"></i>
            <span>数量</span>
          </div>
          <div class="right">
            <van-stepper v-model="addData.number" class="counter"/>
          </div>
        </div>
        <div class="change-password">
          <div class="left">
            <i class="iconfont icon-shangxiazhankai_o"></i>
            <span>价格变动</span>
          </div>
          <div class="right">
            <van-field v-model="addData.plus"  />
          </div>
        </div>
        <div class="beizhu">
          <van-field
              v-model="addData.commentary"
              rows="2"
              autosize
              label="备注"
              type="textarea"
              maxlength="100"
              placeholder="请输入备注"
              show-word-limit
              class="beizhu-input"
          />
        </div>
      </div>
      <div class="submit" >
        <div class="putong-submit" @click="add">
          <i class="iconfont icon-tianjiadingdan1"></i>
          <span>添加记录</span>
        </div>
        <div class="teshu-submit" @click="goSpecialadd">
          <i class="iconfont icon-beizhu"></i>
          <span>有特殊记录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {Notify} from "vant";

export default {
  data() {
    return {
      name:'人名',
      group:'组名',
      addData:{
        time:this.getNowDay(),
        objectName: '',
        number:1,
        plus:0,
        commentary:'',
        oid:"",
      },
      columns: [],
      nameAndOid:[],
      showPicker: false,

    }
  },
  methods: {
    onConfirm(value) {
      this.addData.objectName = value;
      this.nameAndOid.forEach((item)=>{
        if (value===Object.keys(item)[0]){
          this.addData.oid = item[value];
        }
      })
      this.showPicker = false;
    },
    goSpecialadd(){
      this.$router.push({
        path:'/specialadd',
      })
    },
    add(){
      this.addData.plus = parseInt(this.addData.plus);
      axios.post("http://localhost:8080/workRecord/insertWork",this.addData).then((resp)=>{
        console.log(resp)
        if (resp.data === 1){
          Notify({ type: 'success', message: '添加成功',background:'skyblue' });
        }else {
          Notify({ type: 'success', message: '添加失败',background:'skyblue' });
        }
      })
    },
    getNowDay() {

      let date = new Date();  //获取当前时间
      let month = date.getMonth() + 1; //月份处理
      let day= date.getDate();
      month= (month< 10) ? ('0' + month): month;//月份为1-9月,在其前面加0
      day=(day< 10)?("0" + day):day;//日期为1-9号,在其前面加了0
      let s1 = "-";//定义年月日分隔符-
      let s2 = ":";//定义时分秒分隔符:
      let hours = date.getHours()
      hours = hours= (hours< 10) ? ('0' + hours): hours;
      let minutes = date.getMinutes();
      minutes = minutes= (minutes< 10) ? ('0' + minutes): minutes;
      let seconds = date.getSeconds();
      seconds = (seconds< 10) ? ('0' + seconds): seconds;
      //拼接年月日,时分秒
      let currDate = date.getFullYear() + s1 + month + s1 + day
          + " " + hours + s2 + minutes + s2 + seconds;
      return currDate;
    },
  },
  mounted() {
    axios.get("http://localhost:8080/item/listMy").then((resp)=>{
      resp.data.list.forEach((item)=>{
        let obj={}
        obj[item.objectName] = item.oid;
        this.nameAndOid.push(obj);
        this.columns.push(item.objectName);
      })
    })
    this.name = localStorage.getItem("userName");
    this.group = localStorage.getItem("groupName");
  },


}
</script>
<style scoped>
.waibao {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
}
.add {
  background-color: white;
  width: 98%;
  margin: auto;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
  margin-top: 100px;
}
.header {
  background-color: white;
}
p {
  font-size: 30px;
  /*color: skyblue;*/
  opacity: 0.3;
  font-family: "Arial Black", serif;
}
.left {
  width: 40%;
  height: 50px;
  float: left;
  text-align: left;
  margin-left: 20px;
}
.left i {
  font-size: 20px;
}
.left span{
  font-family: "Arial Black",serif ;
  margin-left: 5px;
}
.right {
  width: 50%;
  height: 50px;
  overflow: hidden;
  float: left;
}
.gongneng {

  width: 100%;
  height: 270px;
  background-color: white;
  /*margin-top: 50px;*/
}
.gongneng>div {
  width: 100%;
  height: 50px;
  line-height: 50px;

}
.beizhu {
  height: 120px !important;
  width: 100%;
}
.beizhu-input {
  height: 120px
}
.counter {
  text-align: left;
}
.submit {
  width: 100%;
  height: 50px;
  background-color: white;
  font-family: "Arial Black", serif;
  margin-top: 20px;

}
.submit>div {
  float: left;
  line-height: 50px;
  border-top: 1px solid lightgray;
  /*text-align: center;*/
}
.putong-submit {
  width: 65%;
  height: 50px;
  box-sizing: border-box;
  border-right: 1px solid lightgray;
}
.teshu-submit {
  width: 35%;
  height: 50px;
}
</style>
