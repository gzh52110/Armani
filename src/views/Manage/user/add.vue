<template>
  <div class="user">
    <h1>添加用户</h1>
    <el-form
      :model="userForm"
      :rules="rules"
      ref="userForm"
      label-width="100px"
      class="demo-userForm"
    >
      <el-col :span="12">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input v-model="userForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item prop="birthday" label="生日" required>
          <el-date-picker
            type="date"
            placeholder="生日"
            v-model="userForm.birthday"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="userForm.gender" placeholder="性别">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item._id"
              :label="item.cnName"
              :value="item.enName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('userForm')">重置</el-button>
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
      userForm: {
        username: "",
        password: "",
        phoneNumber: "",
        role: "admin",
        gender: "",
        birthday: 1640966400000,
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入6 到 12 位密码", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        gender: [
          { required: true, message: "请选择性别", trigger: "change" },
        ],
        birthday: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
      imageUrl: "",
      userid: "",
      roleList: [],
    };
  },
  async created() {
    const roleData = await this.$request.get("/role/roleList");
    this.roleList = roleData.data.data.result;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log("formData", this.userForm);
        if (valid) {
          alert("submit!");
          const { data } = await this.$request.post(
            "/manage/addlist",
            this.userForm
          );
          console.log("添加用户后返回", data);

          this.userid = data.data.insertedId;
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
      fData.set("avatar", fileInfo.file);
      fData.set("userid", this.userid);
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