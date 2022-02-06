<template>
  <div>
    <h1>权限指派</h1>
    <el-table
      :data="permissionData"
      style="width: 100%; margin-bottom: 20px"
      row-key="text"
      border
      default-expand-all
      @selection-change="handleSelectionChange"
      @select="check"
      @select-all="checkAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="selection" width="35"> </el-table-column>
      <el-table-column prop="text" label="名称" width="180"> </el-table-column>
      <el-table-column prop="path" label="路径" width="180"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      multipleSelection: [],
      permissionData: [],
      roleList:[],
    };
  },
  async created() {
    const { data } = await this.$request.get("/role/menu");
    this.permissionData = data.data.result;
    const roleData = await this.$request.get("/role/roleList");
    console.log('roleList',roleData.data.data.result);
    this.roleList = roleData.data.data.result;
  },

  methods: {
    handleSelectionChange(val) {
      console.log("val", val);
      this.multipleSelection = val;
    },
    check(selection, row) {
      console.log("selections", selection);
      row.flag = !row.flag;
      console.log("row", row);
      console.log('check',this.permissionData);
    },
    checkAll(selection) {
      selection.map(item=>{
        item.flag=!item.flag;
        return item;
      })
      console.log('checkAll-permision',this.permissionData);
      console.log('selection',selection);
    }
    
  },
};
</script>