<template>
  <div class="role">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage/role/list' }"
        >角色权限</el-breadcrumb-item
      >
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="roleList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
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
      <el-table-column
        label="
      角色中文名"
        prop="cnName"
      ></el-table-column>
      <el-table-column label="角色英文名" prop="enName"></el-table-column>
      <el-table-column
        label="注册时间"
        prop="regtime"
        sortable
      ></el-table-column>
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
      roleList: [],
      multipleSelection: [],
      //⭐⚡角色列表的数据是来源于数据库，且要实现组件共享
    };
  },
  created() {
    this.$request.get("/role/roleList").then(({ data }) => {
      this.roleList = data.data.result;
      console.log("角色列表数据返回", data);
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