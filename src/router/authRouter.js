//以下路由，需要登录后才能进入。
import Manage from "../views/Manage/Manage.vue"
import Home from "../views/Manage/Home.vue"
import goodsRoute from "./goodsRoute"
import Order from "../views/Manage/Order.vue"
import UserRoute from "./userRoute"
import RoleRoute from "./roleRoute"


export default {
    path: '/manage',
    // name: "Manage",
    component: Manage,
    meta: {
        reqiuredAuth: true
    },
    children: [{
            path: '',
            redirect: 'home'
        }, {
            path: 'home',
            component: Home,
        },
        goodsRoute,
        {
            path: 'order',
            component: Order
        },
        UserRoute,
        RoleRoute,
    ],

}