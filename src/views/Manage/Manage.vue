<template>
  <div class="manageBox">
    <el-container height="100vh">
      <el-header class="header">
        <el-row :gutter="20">
          <el-col :span="12">
            <i class="el-icon-goods"></i>
            <span>Armani后台管理系统</span>
          </el-col>
          <el-col :span="12" style="text-align: right">
            {{ userInfo.username }}
            <el-button type="text" @click="logOut">退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 侧边导航 -->
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="vertical"
            @select="handleSelect"
            background-color="#000"
            text-color="#fff"
            active-text-color="rgb(173, 95, 122)"
            router
            style="height: 100%"
          >
            <!-- 一级导航 -->
            <template v-for="item in list">
              <el-submenu
                :index="baseUrl + item.path"
                :key="item.path"
                v-if="item.children"
              >
                <template v-slot:title
                  ><i :class="item.icon"></i
                  ><span>{{ item.text }}</span></template
                >
                <!-- 二级导航 -->
                <template v-for="value in item.children">
                  <el-submenu
                    :index="baseUrl + item.path + value.path"
                    :key="value.path"
                    v-if="value.children"
                  >
                    <template v-slot:title
                      ><span>{{ value.text }}</span></template
                    >
                    <!-- 三级导航 -->
                    <template v-for="it in value.children" >
                      <el-menu-item
                        :key="it.path"
                        :index="baseUrl + item.path + value.path + it.path"
                        :dataset="$store.state.goodslist.goodslist.mainCategory"
                      >
                        <span>{{ it.text }}</span>
                      </el-menu-item>
                    </template>
                  </el-submenu>
                  <el-menu-item
                    :key="value.path"
                    :index="baseUrl + item.path + value.path"
                    v-else
                  >
                    <template
                      ><span>{{ value.text }}</span></template
                    >
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item
                :index="baseUrl + item.path"
                :key="item.path"
                v-else
              >
                <template
                  ><i :class="item.icon"></i
                  ><span>{{ item.text }}</span></template
                >
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1",
      baseUrl: "/manage",
      list: [
        {
          text: "首页",
          path: "/home",
          icon: "el-icon-s-home",
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user",
          children: [
            {
              text: "添加用户",
              path: "/add",
            },
            {
              text: "用户列表",
              path: "/list",
            },
          ],
        },
        {
          text: "商品管理",
          path: "/goods",
          icon: "el-icon-shopping-bag-1",
          children: [
            {
              text: "添加商品",
              path: "/add",
            },
            {
              text: "商品列表",
              path: "/list",
              children: [
                {
                  text: "全部",
                  path: "/all",
                },
                {
                  text: "彩妆",
                  path: "/makeup",
                },
                {
                  text: "护肤",
                  path: "/skincare",
                },
                {
                  text: "香水",
                  path: "/fragrance",
                },{
                  text: "其他",
                  path: "/others",
                }
              ],
            },
          ],
        },
        {
          text: "订单管理",
          path: "/order",
          icon: "el-icon-s-order",
        },
        {
          text: "广告管理",
          path: "/ad",
          icon: "el-icon-data-board",
          children: [
            {
              text: "添加广告",
              path: "/ad",
            },
            {
              text: "广告列表",
              path: "/list",
            },
          ],
        },
        {
          text: "角色权限",
          path: "/access",
          icon: "el-icon-key",
          children: [
            {
              text: "添加角色",
              path: "/add",
            },
            {
              text: "角色列表",
              path: "/list",
            },
            {
              text: "权限指派",
              path: "/set",
            },
          ],
        },
      ],
    };
  },
  computed: {
    //...mapState('countAbout', ['sum', 'school', 'subject'])
    ...mapState("user", ["userInfo"]),
  },
  methods: {
    handleSelect() {},
    logOut() {
      this.$store.commit("user/loginOut");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
.header {
  background: rgb(17, 16, 16, 0.9);
  color: #fff;
  line-height: 60px;
}

.el-main {
  padding-top: 5px;
  padding-bottom: 0px;
}
</style>