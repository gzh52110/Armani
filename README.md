## armani后台管理系统
### 演示
  * 官网：https://www.giorgioarmanibeauty.cn/
  * 上线网址：暂未上线
  * 测试账号：暂无
* git仓库地址：https://github.com/gzh52110/Armani.git
### 团队与分工
* 组长：潘伟庆，成员：邓瑜婷
* 负责模块说明
  * 潘伟庆：
    * 首页：必要的数据展示
    * 用户管理：用户的添加，删除，用户列表，用户信息修改
    * 角色权限：角色的增删查改，角色列表，角色权限的指派
  * 邓瑜婷：
    * 项目搭建
    * 登录:根据角色权限进行是否给予登录。
    * 商品管理：展示商品列表，根据商品进行分类处理，对商品进行增删改查。
### 项目页面截图

>截有代表性得页面，不少于3张
>
>- 首页![home](https://raw.githubusercontent.com/gzh52110/Armani/dev/README_IMG/01home_20220208152439.png)

>- 添加用户![adduser](https://raw.githubusercontent.com/gzh52110/Armani/dev/README_IMG/02adduser_20220208152428.png)
>
>- 商品列表![goodlist](https://raw.githubusercontent.com/gzh52110/Armani/dev/README_IMG/03goodslist_img_20220208192435.png)
>
>- 添加商品![addgoods](https://raw.githubusercontent.com/gzh52110/Armani/dev/README_IMG/04addgoods_20220208192406.png)
>
>- 修改商品信息![updategoods](https://raw.githubusercontent.com/gzh52110/Armani/dev/README_IMG/05updategoods_20220208192508.png)
>
>- 角色权限指派![roleassign](https://raw.githubusercontent.com/gzh52110/Armani/dev/README_IMG/06roleassign_20220208150744.png)

### 项目目录说明
- public      
- src   项目源代码
  - assets
  - mixins
  - router
  - store
  - utils
  - views
  - App.vue
  - main.js
- babel.config.js
- package-lock.json
- package.json
- README.md
- vue.config.js


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).