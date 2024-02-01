<template>
  <div id="app">
<!--    <Login></Login>-->
    <router-view></router-view>
    <Footer v-show="this.$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Login from  "./views/login/index"
import Footer from '@/components/footer'
import axios from "axios";
export default {
  name: 'App',
  components:{
    Login,
    Footer
  },
  mounted() {

  }
}
</script>

<style>
#app{

}
</style>
