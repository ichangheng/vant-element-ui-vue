<template>
  <div class="waibao">
  <div class="query">
    <p>员工查询</p>
    <div class="time">
      <div class="start-time">
        <i class="iconfont icon-kaishishijian"></i>
        <span>起始时间</span>
        <el-date-picker
            class="time-input"
            v-model="value1"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="xuanzhong">
        </el-date-picker>
      </div>
      <div class="end-time">
        <i class="iconfont icon-jieshushijian"></i>
        <span>结束时间</span>
        <el-date-picker
            class="time-input"
            v-model="value2"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="xuanzhong">
        </el-date-picker>
      </div>
    </div>
    <div class="biaoge">
      <el-table
          :data="this.tableData"
          style="width: 100%"
          height="261px"
          border>
        <el-table-column
            prop="objectName"
            label="物品"
            min-width="30">
        </el-table-column>
          <el-table-column
              prop="time"
              label="日期"
              min-width="35">
          </el-table-column>
        <el-table-column
            prop="value"
            label="工资"
            min-width="20">
        </el-table-column>
        <el-table-column
            prop="number"
            label="数量"
            min-width="20">
        </el-table-column>
        <el-table-column
            prop="valid"
            label="有效性"
            min-width="20">
        </el-table-column>
      </el-table>
      <van-pagination v-model="currentPage" :total-items="224" :items-per-page="5" @change="querychaxun"/>
    </div>
    <div class="gongzi">
      <div class="zong-gongzi">
        <i class="iconfont icon-xinzi"></i>
        <span>总工资:{{totalMoney}}</span>
      </div>
      <div class="benye-gongzi">
        <i class="iconfont icon-changyongicon-"></i>
        <span>本页工资:{{thisPageMoney}}</span>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import {Notify} from "vant";
import axios from "axios";

export default {
  data(){
    return {
      value1: '',
      value2: '',
      test:'',
      currentPage:1,
      tableData: [{
        objectName:'',
        time:'',
        value:'',
        number:'',
        valid:'',
      }],
      totalMoney:0,
      thisPageMoney:0
    }
  },
  methods:{
    xuanzhong(){
      if (this.value1!==''&&this.value2!==''){
        // console.log(this.value2)
        // console.log(typeof this.value1)
        let start = new Date(this.value1)
        let end  = new Date(this.value2)
        if (end>=start){
          this.test='pass'
          Notify({ type: 'success', message: '查询成功',background:'skyblue' });
          this.querychaxun();
        }
        else {
          Notify({ type: 'warning', message: '起始时间大于终止时间',background:'red' });
        }
      }
    },
    querychaxun(){
      axios.get("http://localhost:8080/workRecord/selectByTime?start="
          +this.value1+"&end="+this.value2+"&pageNum="+this.currentPage+"&pageSize=5")
          .then((resp)=>{
            resp.data.works.forEach((item)=>{
              if (item.valid===1){
                item.valid = '是'
              }else {
                item.valid = '否'
              }
            })
            this.tableData = resp.data.works;
            this.totalMoney = resp.data.total;
            this.thisPageMoney = resp.data.rangedTotal;
          })
    },
  },
  mounted() {

  }
}
//box-shadow: 0 5px 15px rgba(0,0,0,0.1);
</script>
<style scoped>
.waibao {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
}
.query {
  width: 100%;
  margin: auto;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  margin-top: 50px;
  font-family: "Arial Black", serif;
  background-color: white;
}
p {
  font-size: 25px;
  padding-top: 20px;
  opacity: 0.5;
}
.time {
  width: 100%;
  margin-top: 20px;
}
.time>div {
  display: block;
  height: 60px;
  line-height: 60px;
  background-color: white;
  position: relative;
  margin-bottom: 10px;
}
.time-input{
  display: block;
  width: 70%;
  float: right;
  border: none !important;
}
.time i {
  box-sizing: border-box;
  font-size: 25px;
  margin-right: 2px;
}
.time span {
  font-size: 15px;
  margin-right: 10px;
}
.biaoge {
  width: 100%;
  /*height: 100px;*/
  /*overflow: hidden;*/
}
.gongzi {
  width: 100%;
  height: 40px;
  background-color: white;
  margin-top: 10px;
}
.gongzi>div {
  width: 50%;
  height: 40px;
  line-height: 40px;
  float: left;
  text-align: left;
}
.gongzi i {
  margin-left: 10px;
  margin-right: 2px;
}
</style>
