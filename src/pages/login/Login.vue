<template>
  <div class="bg-wrapper">
    <el-card class="login-card">
      <el-form ref="form" :model="this.formData" label-width="80px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="formData.account"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        account: "",
        password: ""
      },
      formRules: {
        account: [{ required: true, message: '请输入账号', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }]
      }
    }
  }
}
</script>

<style scoped>
  .bg-wrapper {
    height: 100vh;
    background-image: url(../../assets/full_login_bg.jpg);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-card {
    width: 450px;
  }
</style>