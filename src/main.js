import { createApp } from 'vue'
import App from './App.vue'
import Login from './Login.vue'
import Demo from './Demo.vue'
import axios from "axios";
import  {GcSpreadSheets,GcWorksheet,GcColumn}  from '@grapecity-software/spread-sheets-vue'

// 设置axios的默认地址
// axios.defaults.baseURL="http://localhost:8080"
// 将axios挂载到vue的原型中,所有组件都可以直接使用

// Vue.prototype.$http=axios;
var path=window.location.pathname.toLocaleLowerCase();

if(path=="/login"){
    const LoginVue=createApp(Login);
    LoginVue.mount('#app');
}else if(path=="/demo"){
    const DemoVue=createApp(Demo);
    //添加组件
    DemoVue.component("gc-spread-sheets",GcSpreadSheets);
    DemoVue.component("gc-worksheet",GcWorksheet);
    DemoVue.component("gc-column",GcColumn);
    DemoVue.mount('#app');
} else{
    const Vue=createApp(App);
    Vue.mount('#app');
}

axios.interceptors.request.use(function (config) {
    let isFromLogin=window.location.href.indexOf('/login')>-1;
    let auth = localStorage.getItem("authorization");
    if(!isFromLogin){
        if(auth){
            config.headers["authorization"]=auth;
        }else{
            window.location.href="/login";
        }
    }
    return config;
},error => {
    alert(error);
    return Promise.reject(error);
})
//保存token直接只用
//localStorage.setItem("authorization","ttt");


//也可以直接在请求中增加授权
// axios.get('/api/data',{
//     headers:{
//         authorization:"ttt"
//     }
// })