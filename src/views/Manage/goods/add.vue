<template>
  <div class="addBox">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
      
    >
      <el-form-item label="商品名称" prop="productName" >
        <el-input v-model="ruleForm.productName" clearable style="width:450px"></el-input>
      </el-form-item>
       <el-form-item label="商品分类" prop="mainCategory">
        <el-select v-model="ruleForm.mainCategory" placeholder="请选择商品分类"  @change="changeCate">
          <el-option
            :label="item.text"
            :value="item.type"
            v-for="item in category"
            :key="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 生成productCode -->
      <el-form-item label="产品号" prop="getCode">
        <el-input
          type="age"
          autocomplete="off"
          v-model="ruleForm.productCode"
          disabled
          style="width:230px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getCode()">生成</el-button>
      </el-form-item>
      <!-- 上传图片 -->
      <el-form-item label="商品图片" prop="imgUrl">
        <el-upload
          class="avatar-uploader"
          :action="$host + '/product'"
          :show-file-list="false"
          :on-change="onChange"
          :http-request="uploadImg"
          :auto-upload="false"
          :before-upload="beforeAvatarUpload"
          ref="uploadImg"
        >
          <img v-if="ruleForm.imgUrl" :src="ruleForm.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="价格" prop="defaultPrice">
        <el-input
          v-model="ruleForm.defaultPrice"
          placeholder="商品价格"
           style="width:230px"
        ></el-input>
      </el-form-item>
     
      <el-form-item label="商品特殊性质" prop="hotLabel">
        <el-select v-model="ruleForm.hotLabel" placeholder="请选择商品特殊性质">
          <el-option
            :label="it.text"
            :value="it.text"
            v-for="it in hotLabels"
            :key="it.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品简介" prop="introduction">
        <el-input type="textarea" v-model="ruleForm.introduction"  style="width:600px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import goodsMixins from "../../../mixins/goodsMixins"
export default {
  mixins:[goodsMixins],
  // data() {
  //   return {
  //     ruleForm: {
  //       productName: "",
  //       defaultPrice: "",
  //       hotLabel: "",
  //       introduction: "",
  //       mainCategory: "m-makeup",
  //       productCode: "",
  //       imgUrl: "",
  //     },
  //     // imgUrl: "",
  //     goodsId: "",
  //     rules: {
  //       productName: [
  //         {
  //           required: true,
  //           message: "请输入商品名称",
  //           trigger: "blur",
  //         },
  //         {
  //           min: 2,
  //           message: "请至少输入2个字符",
  //           trigger: "blur",
  //         },
  //       ],
  //       defaultPrice: [
  //         {
  //           required: true,
  //           message: "请填写商品价格",
  //           trigger: "blur",
  //         },
  //       ],
  //       mainCategory: [
  //         {
  //           required: true,
  //           message: "请选择商品分类",
  //           trigger: "blur",
  //         },
  //       ],
  //       // getCode: [
  //       //   {
  //       //     required: false,
  //       //     message: "请生成当前商品的产品号",
  //       //     trigger: "blur",
  //       //   },
  //       // ],
  //     },
  //     category: [
  //       {
  //         text: "彩妆",
  //         type: "m-makeup",
  //       },
  //       {
  //         text: "护肤",
  //         type: "m-skincare",
  //       },
  //       {
  //         text: "香水",
  //         type: "m-fragrance",
  //       },
  //       {
  //         text: "其他",
  //         type: "m-others",
  //       },
  //     ],
  //     hotLabels: [
  //       {
  //         text: "热卖",
  //         id: 1,
  //       },
  //       {
  //         text: "新品",
  //         id: 2,
  //       },
  //       {
  //         text: "NEW",
  //         id: 3,
  //       },
  //       {
  //         text: "HOT",
  //         id: 4,
  //       },
  //     ],
  //   };
  // },
  // methods: {
  //   //当上传的图片发生改变的触发的钩子
  //   onChange(file, fileList) {
  //     // 处理图片是否能显示在页面上
  //     this.ruleForm.imgUrl = URL.createObjectURL(file.raw);
  //   },

  //   beforeAvatarUpload(file) {
  //     const isLt2M = file.size / 1024 / 1024 < 2;
  //     if (!isLt2M) {
  //       this.$message.error("上传头像图片大小不能超过 2MB!");
  //     }
  //     return isLt2M;
  //   },
  //   // 上传新增商品信息
  //   submitForm() {
  //     this.$refs.form.validate(async (valid) => {
  //       if (valid) {
  //         //获取商品id
  //         const { data } = await this.$request.post("/product", this.ruleForm);
  //         this.goodsId = data.data.insertedId;
  //         // 获取到商品id再把id和图片信息一同发送到接口
  //         this.$refs.uploadImg.submit();
         
  //       }
  //     });
  //   },
  //   //上传图片
  //  async uploadImg(fileInfo) {
  //     // 把请求参数设置为formdata对象
  //     const fData = new FormData();
  //     // 携带图片的file信息（⭐set的参数，需要跟接口的upload.single('productImg')一致）
  //     fData.set("productImg", fileInfo.file);
  //     //接口要求传id
  //     fData.set("productId", this.goodsId);
  //     const result =await this.$request.put("/upload/productImg", fData);
  //     console.log('res',result);
  //     if(result.status==200){
  //       this.$alert("添加成功","提示",{
  //         type:"success ",
  //         confirmButtonText: '确定',
  //        })
  //     }
      
  //   },
  //   //获取产品号
  //   async getCode() {
  //     let categoryCode = this.categoryCode();
  //     categoryCode = categoryCode[this.ruleForm.mainCategory];
  //     const { data } = await this.$request.post("/product/getcode", {
  //       categoryCode,
  //     });
  //     this.ruleForm.productCode = data.data.newProductCode;
  //   },
  //   // 格式化分类代号
  //   categoryCode() {
  //     let categoryCode = {
  //       "m-makeup": "MK",
  //       "m-skincare": "SC",
  //       "m-fragrance": "FR",
  //       "m-others": "OS",
  //     };
  //     return categoryCode;
  //   },
  //   //点击后，清空表单
  //   resetForm(){
  //     this.ruleForm={
  //       productName: "",
  //       defaultPrice: "",
  //       hotLabel: "",
  //       introduction: "",
  //       mainCategory: "m-makeup",
  //       productCode: "",
  //     }
  //   }
  // },
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