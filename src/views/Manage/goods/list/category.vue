<template>
  <div class="allBox">
    <template>
      <el-table :data="tableData" style="width: 100%" row-key>
        <el-table-column label="#" width="50" type="selection">
        </el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号">
        </el-table-column>

        <el-table-column
          prop="productImages"
          label="图片"
          width="80"
          v-slot="{ row }"
        >
          <el-image
            style="width: 60px; height: 60px"
            :src="formDateImg(row.productImages[0])"
          ></el-image>
        </el-table-column>
        <el-table-column
          prop="productCode"
          label="产品号"
          width="180"
          v-slot="{ row }"
        >
          <span style="font-size: 12px">
            {{ row.productCode }}
          </span>
        </el-table-column>
        <el-table-column
          prop="productName"
          label="商品名称"
          v-slot="{ row }"
          width="300"
        >
          <h5>
            {{ row.productName }}
            <el-tag
              type="info"
              v-if="row.hotLabel"
              size="mini"
              class="el-tag"
              >{{ row.hotLabel }}</el-tag
            >
          </h5>

          <p>
            <span class="defaultPrice">目前价格:￥{{ row.defaultPrice }}</span>
            <span class="channelPriceList"
              >最高价格：￥{{ maxPrice(row.channelPriceList) }}</span
            >
          </p>
        </el-table-column>
        <!-- <el-table-column
          prop="introduction "
          label="商品简介"
          v-slot="{ row }"
          width="650"
          style="font-size: 12px"
        >
          <introduction :introduction="row.introduction"></introduction>
        </el-table-column> -->
        <el-table-column
          prop="publishTime"
          label="发布时间"
          v-slot="{ row }"
          width="150"
        >
          <h5>{{ formDateTime(row.publishTime) }}</h5>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          v-slot="{ row }"
          width="150"
        >
          <h5>{{ formDateTime(row.updateTime) }}</h5>
        </el-table-column>
        <el-table-column label="操作" v-slot="{ row }">
          <el-tooltip content="查看商品更多详情" placement="top">
            <el-button
              size="mini"
              icon="el-icon-search"
              circle
              @click="getItem(row), (dialogFormVisibles = true)"
            ></el-button>
          </el-tooltip>

          <el-dialog title="商品信息" :visible.sync="dialogFormVisibles">
            <el-row>
              <el-col :span="24">
                <el-card :body-style="{ padding: '0px' }">
                  <img class="image" />
                  <div style="padding: 14px">
                    <h2>{{ itemlist.productName }}</h2>
                    <introduction
                      :introduction="itemlist.introduction"
                    ></introduction>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-dialog>

          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            @click="editItem(row), (dialogFormVisible = true)"
          >
            <!-- :visible.sync="dialogFormVisible" -->
          </el-button>
          <el-dialog title="商品信息" :visible.sync="dialogFormVisible">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="商品名称" prop="productName">
                <el-input v-model="ruleForm.productName"></el-input>
              </el-form-item>
              <!-- 上传图片 -->
              <el-form-item label="商品图片" prop="imageUrl">
                <el-upload
                  class="avatar-uploader"
                  :action="$baseURL + '/product'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="ruleForm.imageUrl"
                    :src="ruleForm.imageUrl"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="价格">
                <el-input
                  v-model="ruleForm.defaultPrice"
                  placeholder="商品价格"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品分类" prop="defaultPrice">
                <el-select
                  v-model="ruleForm.mainCategory"
                  placeholder="请选择商品分类"
                >
                  <el-option
                    :label="item.text"
                    :value="item.type"
                    v-for="item in category"
                    :key="item.type"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品特殊性质" prop="hotLabel">
                <el-select
                  v-model="ruleForm.hotLabel"
                  placeholder="请选择商品特殊性质"
                >
                  <el-option
                    :label="it.text"
                    :value="it.id"
                    v-for="it in hotLabels"
                    :key="it.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品简介" prop="desc">
                <el-input
                  type="textarea"
                  v-model="ruleForm.introduction"
                ></el-input>
              </el-form-item>
              <el-form-item> </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false"
                >确 定</el-button
              >
            </div>
          </el-dialog>
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
        :total="total"
      >
      </el-pagination>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import introduction from "./introduction.vue";
export default {
  props: {
    mainCategory: String,
  },
  data() {
    //进入当前路由先获取当前路由参数。(数据注入比created快)
    let { page = 1, size = 10 } = this.$route.query;
    page = typeof page == "string" ? Number(page) : 1;

    return {
      tableData: [],
      page,
      size,
      childernlist: [],
      total: 0,
      imgs: "",
      newImgs: [],
      ruleForm: {},
      formLabelWidth: "100",
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisibles: false,
      itemlist: {},
      rules: {
        productName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        defaultPrice: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
        desc: [{ required: true, message: "请填写商品简介", trigger: "blur" }],
      },
      category: [
        {
          text: "彩妆",
          type: "m-makeup",
        },
        {
          text: "护肤",
          type: "m-skincare",
        },
        {
          text: "香水",
          type: "m-fragrance",
        },
        {
          text: "其他",
          type: "m-others",
        },
      ],
      hotLabels: [
        {
          text: "热卖",
          id: 1,
        },
        {
          text: "新品",
          id: 2,
        },
        {
          text: "NEW",
          id: 3,
        },
        {
          text: "HOT",
          id: 4,
        },
      ],
    };
  },

  created() {
    this.handelCurrentRoute();
  },
  computed: {
    ismainCategory() {
      return !!this.mainCategory;
    },
  },

  methods: {
    //处理不同路由不同请求
    handelCurrentRoute() {
      const routers = this.$route.fullPath.includes("all");
      routers ? this.getDate("/list") : this.getDate("/categroylist");
      // if (routers) {
      //   this.getDate("/list");
      // } else {
      //   this.getDate("/categroylist");
      // }
    },
    //     async getDate() {
    //       const {result,total} = await this.$store.dispatch("goodslist/goodsList", {
    //         params: { page: this.page, size: this.size },
    //       });
    //      this.tableData = result;

    // //     this.imgs =this.tableData.map(item=>item.productImages).filter(item=> item[0]
    // // )
    // // this.newImgs =[...this.imgs]
    // // console.log('this',this.newImgs);

    //     this.total = total
    //     },
    async getDate(routerId) {
      const {
        data: {
          data: { result, total },
        },
      } = await this.$request.get("/product" + routerId, {
        params: {
          page: this.page,
          size: this.size,
          mainCategory: this.ismainCategory ? this.mainCategory : "",
        },
      });

      // const { data } = await this.$request.get("/product/list", {
      //   params: {
      //     page: this.page,
      //     size: this.size,
      //   },
      // });
      // const result =
      //   data.data.result.lenght > data.data.newgoodlist.lenght
      //     ? data.data.result
      //     : data.data.newgoodlist;
      this.tableData = result;

      this.total = total;
      this.childernlist = this.tableData.map((item) => item.childProductList);
      localStorage.setItem("goodslist", JSON.stringify(result));
    },
    //处理更改时间和修改时间
    formDateTime(Time) {
      return typeof Time == "string" ? Time : this.timestampToTime(Time);
    },
    //格式化时间戳
    timestampToTime(timestamp) {
      var date = new Date(timestamp);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      const strDate = Y + M + D + h + m + s;
      return strDate;
    },
    //处理图片
    formDateImg(imgs){
      console.log('imgs',imgs);
      if(!imgs){
        return this.$host+'/img/armanilogo.jpeg'
      }
     return imgs.includes('giorgioarmanibeauty')? imgs : this.$host+imgs
      // if(imgs.includes('giorgioarmanibeauty')){
      //   return imgs
      // }else{
      //   return this.$host+imgs
      // }
    

    },

    //最高价格
    maxPrice(channelPriceList) {
      let res = Math.max(...channelPriceList);
      return res;
    },

    //一页显示不同数量数据
    handleSizeChange(size) {
      this.size = size;
      this.handelCurrentRoute();
      //   this.getDate();
      this.$router.replace({
        query: { ...this.$route.query, size },
      });
    },
    //点击不同页面时
    handleCurrentChange(page) {
      this.page = page;
      this.handelCurrentRoute();
      //   this.getDate();
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
    indexMethod(index) {
      return index + 1;
    },
    editItem(row) {
      this.ruleForm = {
        productName: row.productName,
        defaultPrice: row.defaultPrice,
        hotLabel: row.hotLabel,
        desc: "",
        imageUrl: row.productImages[0],
        mainCategory: row.mainCategory,
      };
    },

    //获取单个商品信息
    getItem(row) {
      //⭐⭐因为新增的数据没有productCode，所以不能获取新增的数据。
      this.$request.get("/product/" + row.productCode).then(({ data }) => {
        this.itemlist = data.data;
      });
    },

    handleAvatarSuccess(res, file) {
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
  },
  components: {
    introduction,
  },
};
</script>


<style lang="scss">
.el-table {
  thead {
    color: black;
    .cell {
      text-align: center;
    }
  }
  tbody {
    tr {
      td {
        .el-table_1_column_8 {
          .cell {
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
}
.cell {
  .defaultPrice {
    font-size: 14px;
    margin-right: 10px;
    color: black;
  }
  .channelPriceList {
    font-size: 12px;
    color: rgb(59, 59, 59);
  }
  .el-tag {
    margin-left: 10px;
  }
}
.el-table__row {
  padding: 0px;
  .el-table__cell {
    padding: 0px;
    text-align: center;

    .el-button {
      margin-right: 10px;
    }
  }
}
.el-dialog{
  text-align: left;
}
</style>