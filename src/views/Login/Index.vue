<template>
  <el-card class="login-form-layout">

    <el-form :model="users"   ref="users"  :rules="rules">
      <div style="text-align: center">
       <!-- <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>-->
      </div>
      <h2 class="login-title color-main">沙雕后台管理</h2>

      <el-form-item label='用户名' prop="username">
        <el-input placeholder="请输入用户名"  type="text" :name="users.username" v-model="users.username"  clearable> ></el-input>
      </el-form-item>
      <el-form-item label='密码' prop="password">
        <el-input placeholder="请输入密码"   type="password" :name="users.password" v-model="users.password" show-password></el-input>
      </el-form-item>

      <el-row center="true">

        <el-button type="primary"  @click="Login('users')">登录</el-button>
        <el-button type="default" @click="resetForm('users')">取消</el-button>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  import * as types from '../../vuex/types'
  import axios from 'axios'
  export default {
      name: 'login',
      data () {
          return {
             users:{
                 username: '',
                 password: ''
             },
              token: '',
              rules: {
                 username :[
                     { required: true, message: '请输入用户名', trigger: 'blur'}
                 ],
                 password :[
                     { required: true, message: '请输入密码呀', trigger: 'blur'}
                 ]
              }
          }
      },
      methods: {
          Login(formName){
            this.$refs[formName].validate((valid) =>{
                if(valid){
                   this.$store.dispatch("LoginByUsername", this.users).then(()=> {
                       this.$router.push({
                           path: '/'
                       });
                   }).catch(() => {
                           this.$message({
                               type: "error",
                               message: "用户名或者密码不正确1"
                           });
                       })
                } else {
                    console.log('验证不通过');
                    this.$message({
                        type: "error",
                        message: "用户名或者密码不正确2"
                    });
                    return false
                }
                });
              },
          resetForm(formName){
              this.$refs[formName].resetFields();
          }
          }
  }
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-radius:10px;
  }

  .login-title {
    text-align: center;
  }
</style>
