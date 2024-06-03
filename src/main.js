import { createApp } from 'vue'
import App from './App.vue'
import Login from './Login.vue'
import axios from "axios";

// 设置axios的默认地址
// axios.defaults.baseURL="http://localhost:8080"
// 将axios挂载到vue的原型中,所有组件都可以直接使用

// Vue.prototype.$http=axios;

if(window.location.pathname.toLocaleLowerCase()=="/login"){
    const LoginVue=createApp(Login);
    LoginVue.mount('#app');
}else{
    // let auth= localStorage.getItem("authorization");
    // alert(auth)
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