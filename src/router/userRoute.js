//用户管理的子路由(manage的子路由)
import User from "../views/Manage/User.vue"
import Add from "../views/Manage/user/add.vue"
import List from "../views/Manage/user/list.vue"

export default {
    path: 'user',
    component: User,
    children: [
        {
            path:'/',
            redirect:'list'
        },
        {
            path: 'add',
            component: Add
        },
        {
            path: 'list',
            component: List
        }
    ]

}