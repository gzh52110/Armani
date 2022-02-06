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
                    <template v-for="it in value.children">
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
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1",
      baseUrl: "/manage",
      list: [],
    };
  },
  computed: {
    //...mapState('countAbout', ['sum', 'school', 'subject'])
    ...mapState("user", ["userInfo"]),
    ...mapState("role", { userRole: "role" }),
  },
  async created() {
    this.role = this.getRole(this.userInfo.role);
    const { data } = await this.$request.get("/role/permission", {
      params: {
        role: this.userRole,
      },
    });
    this.list = data.data.roleAccess;
    console.log("roledata", data);
  },
  methods: {
    handleSelect() {},
    logOut() {
      this.$store.commit("user/loginOut");
      this.$router.push("/login");
    },
    ...mapMutations("role", {
      getRole: "getRole", //映射this.change2为this.$store.commit('change')

      // 函数形式：
      change3: (commit, payload) => {
        commit("change", payload);
      },
    }),
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
.el-aside {
  height: 100vh;
  overflow-x: hidden;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 15px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(46, 116, 207, 0.4);
}
.el-breadcrumb {
  font-size: 1.2em;
  margin: 0.5em 0;
}
</style>