import request from '../utils/request'
import router from '../router';
import authRouter from "../router/authRouter"

let userInfo = localStorage.getItem("userInfo");

try {
    userInfo = JSON.parse(userInfo) || {};
} catch (err) {
    userInfo = {};
}

export default {
    namespaced: true,
    state: {
        userInfo,
    },
    getters: {
        isLogin(state) {
            return !!state.userInfo._id
        }
    },
    mutations: {
        //登录
        login(state, payload) {
            state.userInfo = payload;
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        },
        // 退出登录
        loginOut(state) {
            state.userInfo = {}
            localStorage.removeItem('userInfo')
        },
        //动态配置路由
        addRoute() {
            router.addRoute(authRouter)
        },
        removeItem(state, payload) {
            console.log('payload', payload);

        }
    },
    actions: {
        //actions处理异步操作，通过actions修改mutations，再通过mutations修改state。
            async loginIng(context, payload) {
                const {
                    username,
                    password
                } = payload
                const {
                    data
                } = await request.get('/manage/login', {
                    params: {
                        username,
                        password
                    }
                });
                if (data.code === 200) {
                    //如果登录成功，就把新的登录人员写进localStorage。
                    context.commit('login', data.data[0])               
                    context.commit('addRoute')
                }


                return data
            },
        

    }
}