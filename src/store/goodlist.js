import request from '../utils/request'

let goodslist = localStorage.getItem('goodslist');

try {
    goodslist = JSON.parse(goodslist) || []
} catch (err) {
    goodslist = []
}

export default {
    namespaced: true,
    state: {
        goodslist
    },
    getters: {

    },
    mutations: {
        goodslist(state, payload) {
            state.goodslist = payload
            localStorage.setItem('goodslist', JSON.stringify(state.goodslist))
        }
    },
    //获取全部数据
    actions: {
        async goodsList(context,payload) {
            const {
                data
            } = await request.get("/product/list",payload
            );
           const {result,total} =data.data;
            if(data.code==200){
                context.commit('goodslist',result)
            }
           return {result,total}

        }
    }
}