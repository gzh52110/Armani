//角色与权限管理的子路由(manage的子路由)
import Role from "../views/Manage/Role.vue"
import Add from "../views/Manage/role/Add.vue"
import List from "../views/Manage/role/List.vue"
import Assign from "../views/Manage/role/Assign.vue"

export default {
    path: 'role',
    component: Role,
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
        },
        {
            path: 'assign',
            component: Assign
        }
    ]

}