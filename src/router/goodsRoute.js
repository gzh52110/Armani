//商品列表的子路由(manage的子路由)
import Goods from "@/views/Manage/Goods.vue"
import Add from "@/views/Manage/goods/add.vue"
import Edit from "@/views/Manage/goods/edit.vue"
import List from "@/views/Manage/goods/list.vue"
import goodslistCategory from "./goodslistCategory"



export default {
    
    path:'goods',
    component:Goods,
    children:[{
        path:'/',
        redirect:'list'
    },{
        path:'add',
        component:Add
    },{
        path:'edit/:id',
        component:Edit
    },{
        path:'list',
        component:List,
        children:goodslistCategory
    }]
}