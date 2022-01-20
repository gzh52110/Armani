<template>
  <div class="user">
    <h1>用户列表</h1>
    <el-table
      :data="usersList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="phoneNumber" label="手机号码" width="180">
      </el-table-column>
      <el-table-column prop="gender" label="性别"> </el-table-column>
      <el-table-column prop="birthday" label="生日"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      usersList: [],
    };
  },
  created() {
    this.$request.get("/manage/userlist").then(({ data }) => {
      this.usersList = data.data;
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
</style>