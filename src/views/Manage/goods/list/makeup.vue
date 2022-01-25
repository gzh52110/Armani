<template>
  <category :mainCategory='mainCategory'></category>
</template>

<script>
import category from "./category.vue";

export default {
  data() {
    return { mainCategory: "m-makeup" };
  },
  // props:['dataset'],
  //  mainCategory:'m-makeup',

  created() {
    // this.getDate();
  },

  methods: {
    // async getDate() {
    //   const {
    //     data: {
    //       data: { result, total },
    //     },
    //   } = await this.$request.get("/product/categroylist", {
    //     params: {
    //       page: this.page,
    //       size: this.size,
    //       mainCategory: this.mainCategory,
    //     },
    //   });

    //   // this.tableData = result;
    //   // this.total = total;
    //   // this.childernlist = this.tableData.map((item) => item.childProductList);
    //   // console.log("this.tableData", this.tableData);
    // },

    // //最高价格
    // maxPrice(channelPriceList) {
    //   let res = Math.max(...channelPriceList);
    //   return res;
    // },
    // //获取mainCategory
    // getmainCategory() {},
    // //一页显示不同数量数据
    // handleSizeChange(size) {
    //   this.size = size;
    //   this.getDate();
    //   this.$router.replace({
    //     query: { ...this.$route.query, size },
    //   });
    // },
    // //点击不同页面时
    // handleCurrentChange(page) {
    //   this.page = page;
    //   this.getDate();
    //   //通过给路由传参，实现刷新页面也不会重新刷新数据
    //   this.$router.replace({
    //     query: { ...this.$route.query, page },
    //   });
    // },

    // //⭐删除还没做
    // // ...mapActions({
    // //   removeItem(dispatch, id) {
    // //     dispatch("removeItem", id);
    // //     this.tableData = this.tableData.filter((item) => item._id != id);
    // //   },
    // // }),
    // indexMethod(index) {
    //   return index + 1;
    // },
  },
  components: {
    category,
  },
};
</script>

