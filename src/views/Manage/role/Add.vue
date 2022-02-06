<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage/role/list' }">角色权限</el-breadcrumb-item>
      <el-breadcrumb-item>添加角色</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="dataForm"
      :rules="rules"
      ref="dataForm"
      label-width="100px"
      class="demo-dataForm"
    >
      <el-col :span="12">
        <el-form-item label="角色中文名称" prop="cnName">
          <el-input v-model="dataForm.cnName"></el-input>
        </el-form-item>
        <el-form-item label="角色英文名称" prop="enName">
          <el-input v-model="dataForm.enName"></el-input>
        </el-form-item>
        <el-form-item label="描述/备注">
          <el-input type="textarea" v-model="dataForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dataForm')"
            >创建角色</el-button
          >
          <el-button @click="resetForm('dataForm')">重置</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="8">
        <el-upload
          ref="uploadForm"
          name="avatar"
          class="avatar-uploader"
          :action="$host + '/api/upload/avatar'"
          :auto-upload="false"
          :on-change="onChange"
          :http-request="uploadFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataForm: {
        cnName: "",
        enName: "",
        desc: "",
      },
      rules: {
        cnName: [
          { required: true, message: "请输入角色中文名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
        ],
        enName: [
          { required: true, message: "请输入角色英文名称", trigger: "blur" },
          { min: 3, max: 40, message: "长度在 3 到 40 个字符", trigger: "blur" },
        ],
      },
      imageUrl: "",
      roleid: "",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log("formData", this.dataForm);
        if (valid) {
          alert("submit!");
          const { data } = await this.$request.post(
            "/role/addRole",
            this.dataForm
          );
          console.log("添加用户后返回", data);

          this.roleid = data.data.insertedId;
          // 上传图片
          this.$refs.uploadForm.submit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async uploadFile(fileInfo) {
      console.log("fileInfo", fileInfo);
      const fData = new FormData();
      fData.set("roleAvatar", fileInfo.file);
      fData.set("roleid", this.roleid);
      // const productId = '';
      // fData.set("productId", productId);
      console.log("fData", fData);
      const res = await this.$request.put("/upload/avatar", fData);

      console.log("上传图片返回", res);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    onChange(file, fileList) {
      console.log("onChange", file, fileList);
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload(file) {
      console.log("file", file);

      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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