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
            console.log('goodsliststore',payload);
            // const {data}= await request.post("/product",payload
            // );
            // console.log('data',data);
        //   let result;
        //    const total = data.data.total;
        //     if(data.code==200){
        //          result = data.result.length>data.data.result.length?data.data.result:data.result;
        //         context.commit('goodslist',result)
        //     }
        //    return data

        }
    }
}