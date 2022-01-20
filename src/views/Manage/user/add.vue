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
      <el-form-item label="用户名" prop="username">
        <el-col :span="11">
          <el-input v-model="userForm.username"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="手机号" prop="password">
        <el-col :span="11">
          <el-input v-model="userForm.password"></el-input> </el-col
      ></el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="userForm.gender" placeholder="性别">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生日" required>
        <el-col :span="11">
          <el-form-item prop="birthday">
            <el-date-picker
              type="date"
              placeholder="生日"
              v-model="userForm.birthday"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('userForm')">重置</el-button>
      </el-form-item>
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
        gender: "",
        birthday: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入11为手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" },
        ],
        gender: [
          { required: true, message: "请选择活动区域", trigger: "change" },
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
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log("formData", this.userForm);
        if (valid) {
          alert("submit!");
          this.$request.post('/manage/addlist',this.userForm).then((res)=>{
              console.log('res',res);
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>