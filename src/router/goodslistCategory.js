import All from "../views/Manage/goods/list/all.vue"
import Fragrance from "../views/Manage/goods/list/fragrance.vue"
import Skincare from "../views/Manage/goods/list/skincare.vue"
import Makeup from "../views/Manage/goods/list/makeup.vue"
import Others from "../views/Manage/goods/list/others.vue"

export default [{
        path:'/',
        redirect:'all'
    },{
        path:'all',
        component:All
    },{
        path:'fragrance',
        component:Fragrance
    },{
        path:'makeup',
        component:Makeup
    },{
        path:'skincare',
        component:Skincare
    },{
        
            path:'others',
            component:Others
        
    }]