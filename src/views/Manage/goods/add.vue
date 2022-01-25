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
          class="avatar-uploader"
          :action="$host+'/product'"
          :show-file-list="false"
          :http-request="uploadImg"
          :auto-upload="false"
          :before-upload="beforeAvatarUpload"
          name="goods"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
          <template v-slot="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
          </template>
          <!-- <img
            v-if="ruleForm.imgUrl"
            :src="ruleForm.imgUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
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
      <el-form-item label="商品简介" prop="introduction">
        <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
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
      ruleForm: {
        productName: "",
        defaultPrice: "",
        hotLabel: "",
        introduction: "",
        imgUrl: "",
        mainCategory: "m-makeup",
        productCode: "",
      },
      rules: {
        productName: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
        defaultPrice: [
          {
            required: true,
            message: "请选择商品分类",
            trigger: "blur",
          },
        ],
        desc: [
          {
            required: true,
            message: "请填写商品简介",
            trigger: "blur",
          },
        ],
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
    uploadImg(fileInfo) {
      console.log("fileInfo", fileInfo);
      const fData = new FormData();
        fData.set('goods',fileInfo.file)
      // console.log('fileList',fileList);
      // this.ruleForm.imgUrl = URL.createObjectURL(fileInfo.file.name);
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
        }
      });

      //  this.$request.post('/product',this.ruleForm).then(({data})=>{
      //       console.log('data',data);
      //   })
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