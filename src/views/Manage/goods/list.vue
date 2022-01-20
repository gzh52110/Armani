<template>
  <div class="listBox">
    <template>
      <el-table :data="tableData" style="width: 100%" row-key>
        <el-table-column label="#" width="50" type="selection">
        </el-table-column>
        <el-table-column
          prop="img_url"
          label="图片"
          width="80"
          v-slot="{ row }"
        >
          <el-image
            style="width: 60px; height: 60px"
            :src="$host + row.img_url"
          ></el-image>
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
          v-slot="{ row }"
          width="900"
        >
          <h5>{{ row.goods_name }}</h5>
          <p>
            <span>￥{{ row.sales_price }}</span
            ><del>{{ row.price }}</del>
          </p>
        </el-table-column>
        <el-table-column label="操作" v-slot="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            @click="editItem()"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="removeItem(row._id)"
          ></el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="prev, pager, next, sizes, total "
        :total="total"
      >
      </el-pagination>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    //进入当前路由先获取当前路由参数。(数据注入比created快)
    let { page, size = 10 } = this.$route.query;
    page = typeof page == "string" ? Number(page) : 1;

    return {
      tableData: [],
      page,
      size,
      total: 0,
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    async getDate() {
      const {
        data: {
          data: { result, total },
        },
      } = await this.$request.get("/goods", {
        params: {
          page: this.page,
          size: this.size,
        },
      });

      this.tableData = result;
      console.log("this.tableData", this.tableData);
      this.total = total;
    },
    //一页显示不同数量数据
    handleSizeChange(size) {
      this.size = size;
      this.getDate();
      this.$router.replace({
        query: { ...this.$route.query, size },
      });
    },
    //点击不同页面时
    handleCurrentChange(page) {
      this.page = page;
      this.getDate();
      //通过给路由传参，实现刷新页面也不会重新刷新数据
      this.$router.replace({
        query: { ...this.$route.query, page },
      });
    },
    ...mapActions({
      removeItem(dispatch, id) {
          dispatch('removeItem',id)
       this.tableData =  this.tableData.filter(item=>item._id!=id)
      },
    }),

    editItem(id) {},
  },
};
</script>


<style lang="scss">
.el-table__row {
  padding: 0px;
  .el-table__cell {
    padding: 0px;
  }
}
</style>