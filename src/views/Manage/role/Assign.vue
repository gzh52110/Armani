<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage/role/list' }"
        >角色权限</el-breadcrumb-item
      >
      <el-breadcrumb-item>权限指派</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="roleForm"
      :rules="rules"
      ref="roleForm"
      label-width="100px"
      class="demo-roleForm"
    >
      <el-form-item label="角色" prop="role">
        <el-select v-model="roleForm.roleId" placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item._id"
            :label="item.cnName"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>

      <el-tree
        class="filter-tree"
        :data="permissionData"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        node-key="text"
        :filter-node-method="filterNode"
        @check-change="checkStatus"
        ref="tree"
      >
      </el-tree>

      <el-form-item>
        <el-button type="primary" @click="submitForm('roleForm')"
          >确认指派</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roleForm: { roleId: "" },
      rules: {
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
      filterText: "",
      permissionData: [],
      roleList: [],
      defaultProps: {
        children: "children",
        label: "text",
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  async created() {
    const { data } = await this.$request.get("/role/menu");
    this.permissionData = data.data.result;
    const roleData = await this.$request.get("/role/roleList");
    // console.log("roleList", roleData.data.data.result);
    this.roleList = roleData.data.data.result;
    this.$refs.tree.setChecked("用户管理");
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.text.indexOf(value) !== -1;
    },
    /* setChecked(data, checked, deep ) {
      console.log('data',data);
      console.log('checked',checked);
      console.log('deep',deep);
    }, */
    checkStatus(node, val2, val3) {
      node.flag = !node.flag;
      // console.log("node", node);
      // console.log("checkStatus-permission", this.permissionData);
      // console.log("val2", val2);
      // console.log("val3", val3);
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        // console.log("formData", this.roleForm);
        if (valid) {
          alert("submit!");
          const { data } = await this.$request.put(
            "/role/" + this.roleForm.roleId,
            { permission: this.permissionData }
          );
          console.log("指派权限后返回", data);

          // this.userid = data.data.insertedId;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>