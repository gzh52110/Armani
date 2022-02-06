<template>
<div class="loginBox">
    <h3>阿玛尼后台管理系统</h3>
 <el-form :model="form"  :rules="rules" ref="form" >
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('form')">登录</el-button>
           
        </el-form-item>
    </el-form>
</div>
   
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    username: "",
                    password: "",
                },
                rules: {
                    username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }, ],
                    password: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }, ],
                },
            };
        },
        methods: {
            submitForm() {
                this.$refs.form.validate(async (valid)=>{
                    if(valid){
                     const data = await this.$store.dispatch('user/loginIng',this.form);
                     console.log('登陆成功',data);
                     //一定要登录成功，才能添加manage路由。
                     if(data.code===200){
                        //登录成功，记录当前账号的角色
                        this.$store.commit('role/getRole',data.data[0].role);
                        const {targetUrl = '/manage'} = this.$route.query;
                        this.$router.push(targetUrl)
                     }else{
                         console.log('fails');
                     }
                    
                    }

                })
            },
           
        },
    };
</script>

<style lang="scss">
.loginBox{
    h3{
        font-weight: normal;
        color: black;
        font-family: "雅黑";
    }
    width: 400px;
    height: 300px;
    border: 1px solid rgb(59, 59, 59);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 10px 20px;
}
</style>