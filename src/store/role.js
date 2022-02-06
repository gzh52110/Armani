import request from '../utils/request'
import router from '../router';
import authRouter from "../router/authRouter"


export default {
    namespaced: true,
    state: {
        role:'',
       
    },
    getters: {
        
    },
    mutations: {
        //修改角色
        getRole(state,payload) {
            state.role=payload;
        },

        //动态配置路由
        addRoute() {
            // router.addRoute(authRouter)
        },
    },
    actions: {
        //actions处理异步操作，通过actions修改mutations，再通过mutations修改state。

        

    }
}