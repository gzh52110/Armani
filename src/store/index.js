import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import goodslist from './goodlist'
import role from './role'


Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        // user
    },
    getters:{
        isLogin(state){
    
            return !!state.user.userInfo._id
        }
    },
    modules:{
        user,
        goodslist,
        role
    },

})


if(store.getters.isLogin){
    store.commit('user/addRoute')

}





export default store