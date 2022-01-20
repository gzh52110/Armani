import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        // user
    },
    getters:{
        isLogin(){
            
            return user.getters
        }
    },
    modules:{
        user
    },

})


if(store.getters.isLogin){
    store.commit('user/addRoute')

}





export default store