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
            :src="row.productImages[0]"
          ></el-image>
        </el-table-column>

        <el-table-column
          prop="productName"
          label="商品名称"
          v-slot="{ row }"
          width="450"
        >
          <h5>
            {{ row.productName }}
            <el-tag type="info" v-if="row.hotLabel" size="mini">{{
              row.hotLabel
            }}</el-tag>
          </h5>

          <p>
            <span>目前价格:￥{{ row.ceilingPrice }}</span>
            <span>最高价格：￥{{ maxPrice(row.channelPriceList) }}</span>
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
          width="200"
        >
          <h5>{{ row.publishTime }}</h5>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          v-slot="{ row }"
          width="200"
        >
          <h5>{{ row.updateTime }}</h5>
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
              <el-col
                :span="24"
              >
                <el-card :body-style="{ padding: '0px' }">
                  <img

                    class="image"
                  />
                  <div style="padding: 14px">
                    <h2>{{itemlist.productName}}</h2>
                    <introduction :introduction="itemlist.introduction"></introduction>
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
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
    this.getDate();
  },

  methods: {
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
    async getDate() {
      const {
        data:{data:{result,total}}
      } = await this.$request.get("/product/list", {
        params: {
          page: this.page,
          size: this.size,
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
       console.log("data,data", result);

      this.tableData = result;
      this.total = total;
      this.childernlist = this.tableData.map((item) => item.childProductList);
      localStorage.setItem("goodslist", JSON.stringify(data.data.result));
    },

    //最高价格
    maxPrice(channelPriceList) {
      let res = Math.max(...channelPriceList);
      return res;
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
      console.log("row", row);
      this.$request.get("/product/" + row.productCode).then(({ data }) => {
        console.log("data1", data.data);
        this.itemlist = data.data;
        console.log("item", this.itemlist);
      });
    },

    handleAvatarSuccess(res, file) {
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      console.log("this.ruleForm.imageUrl", this.ruleForm.imageUrl);
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
.el-table__row {
  padding: 0px;
  .el-table__cell {
    padding: 0px;
  }
}
</style>