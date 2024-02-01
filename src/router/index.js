//配置路由
import Vue from 'vue'
import Router from 'vue-router'

//使用插件
Vue.use(Router);

//引入路由组件
import Login from '@/views/login/index'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//配置路由(此处展示的是二级路由，一级路由没有children)
export default new Router({
    routes:[
        {
            path:"/",
            redirect:"/login",
        },
        {
            path:'/login',
            component:Login,
            meta:{isShow:false}
        },
        {
            path:'/footer',
            component:()=>import('@/components/footer/index')
        },
        {
            path:'/home',
            component:()=>import('@/views/home'),
            meta:{isShow:true}
        },
        {
            path:'/add',
            component:()=>import('@/views/add'),
            meta:{isShow:true}
        },
        {
            path:'/specialadd',
            component:()=>import('@/views/specialadd'),
            meta:{isShow:false}
        },
        {
            path:'/query',
            component:()=>import('@/views/query'),
            meta:{isShow:true}
        },
        {
            path:'/me',
            component:()=>import('@/views/me'),
            meta:{isShow:true}
        },
        {
            path:'/home',
            component:()=>import('@/views/home'),
            meta:{isShow:true}
        }
        //重定向，在项目跑起来的时候，访问/会跳转到ZeroZero
    ]
})
