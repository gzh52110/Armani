<template>
  <div class="makeupBox">
    <template>
      <el-table :data="tableData" style="width: 100%" row-key>
        <el-table-column label="#" width="50" type="selection">
        </el-table-column>
         <el-table-column
      type="index"
      :index="indexMethod"
      label="序号">

    </el-table-column>
        <el-table-column
          prop="productImages"
          label="图片"
          width="80"
          v-slot="{ row }"
        >
          
          <el-image
            style="width: 60px; height: 60px"
            :src="row.productImages[0]"
          ></el-image>
        </el-table-column>
        <el-table-column
          prop="productName"
          label="商品名称"
          v-slot="{ row }"
          width="300"
        >
          <h5>{{ row.productName }} {{dataset}}
                <el-tag type="info" v-if="row.hotLabel" size="mini">{{row.hotLabel}}</el-tag>
          </h5>
         
          <p>
           <span>目前价格:￥{{ row.defaultPrice }}</span>
           <span>最高价格：￥{{maxPrice(row.channelPriceList)}}</span>
        
          </p>
        </el-table-column>
         <el-table-column
          prop="publishTime"
          label="发布时间"
          v-slot="{ row }"
          width="300"
        >
          <h5>{{ row.publishTime }}</h5>
        </el-table-column>
             <el-table-column
          prop="updateTime"
          label="更新时间"
          v-slot="{ row }"
          width="300"
        >
          <h5>{{ row.updateTime }}</h5>
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
            @click="removeItem(row.productCode)"
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
        :total ="total"
      >
      </el-pagination>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props:['dataset'],
  data() {
    //进入当前路由先获取当前路由参数。(数据注入比created快)
    let { page, size = 10 } = this.$route.query;
    page = typeof page == "string" ? Number(page) : 1;

    return {
      tableData: [],
      page,
      size,
      mainCategory:'m-others',
      childernlist: [],
       total: 0,
    };
  },
  created() {

    this.getDate();
  },

  methods: {
    async getDate() {
      const {
        data:{data:{result,total}},
      } = await this.$request.get("/product/categroylist", {
        params: {
          page: this.page,
          size: this.size,
          mainCategory:this.mainCategory
        },
      });
      
      this.tableData = result;
      this.total = total
      this.childernlist = this.tableData.map(item => item.childProductList);
      console.log("this.tableData", this.tableData);
     
    },

    //最高价格
    maxPrice(channelPriceList){
        let res = Math.max(...channelPriceList);
        return res
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

    //⭐删除还没做
    ...mapActions({
      removeItem(dispatch, id) {
        dispatch("removeItem", id);
        this.tableData = this.tableData.filter((item) => item._id != id);
      },
    }),
    indexMethod(index){
        return index+1
    }
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