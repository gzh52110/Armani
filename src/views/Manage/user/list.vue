<template>
  <div class="user">
    <h1>用户列表</h1>
    <el-table
      :data="usersList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="账号ID">
              <span>{{ props.row._id }}</span>
            </el-form-item>
            <el-form-item label="手机号码">
              <span>{{ props.row.phoneNumber }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.gender }}</span>
            </el-form-item>
            <el-form-item label="生日">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="头像" prop="avatar">
        <template slot-scope="props">
          <el-avatar
          shape="square"
          :size="80"
          fit="cover"
          :src="serverHost + props.row.avatar"
        ></el-avatar>
        </template>
        
      </el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column
        label="注册时间"
        prop="regtime"
        sortable
      ></el-table-column>
      <el-table-column label="角色" prop="roleCnName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      serverHost: "http://localhost:8889/",
      usersList: [],
      multipleSelection: [],
    };
  },
  created() {
    this.$request.get("/manage/userlist").then(({ data }) => {
      this.usersList = data.data;
      console.log("用户列表数据返回", data);
    });
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleSelectionChange(val) {
      console.log("多选框功能", val);
      this.multipleSelection = val;
    },
    //编辑：头像与个人信息
    //删除
    //将原来的普通用户与管理员用户合并，通过角色管理及权限管理来区分
    //按钮权限和页面权限（动态添加路由）
  },
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>