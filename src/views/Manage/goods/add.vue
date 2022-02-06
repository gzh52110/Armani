<template>
  <div class="addBox">
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
      <el-form-item label="商品图片" prop="imgUrl">
        <el-upload
          ref="uploadForm"
          name="productImg"
          class="avatar-uploader"
          :action="$host + '/api/upload/avatar'"
          :auto-upload="false"
          :on-change="onChange"
          :http-request="uploadFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
        <el-select v-model="ruleForm.mainCategory" placeholder="请选择商品分类">
          <el-option
            :label="item.text"
            :value="item.type"
            v-for="item in category"
            :key="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品特殊性质" prop="hotLabel">
        <el-select v-model="ruleForm.hotLabel" placeholder="请选择商品特殊性质">
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      imageUrl: "",
      productId: "",
      ruleForm: {
        productName: "",
        defaultPrice: "",
        hotLabel: "",
        desc: "",
        imgUrl: "",
        mainCategory: "m-makeup",
      },
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
  methods: {
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
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const data = await this.$store.dispatch(
            "goodslist/goodsList",
            this.ruleForm
          );
          console.log("this.ruleForm", this.ruleForm);
          console.log("adddata", data);
          this.productId = data.data.insertedId;
          // 上传图片
          this.$refs.uploadForm.submit();
        }
      });

      //  this.$request.post('/product',this.ruleForm).then(({data})=>{
      //       console.log('data',data);
      //   })
    },
    async uploadFile(fileInfo) {
      console.log("fileInfo", fileInfo);
      const fData = new FormData();
      fData.set("productImg", fileInfo.file);
      fData.set("productId", this.productId);
      console.log("fData", fData);
      const res = await this.$request.put("/upload/productImg", fData);

      console.log("上传图片返回", res);
    },
    onChange(file, fileList) {
      console.log("onChange", file, fileList);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
  },
};
</script>


<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>