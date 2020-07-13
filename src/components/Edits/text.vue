<template>
  <span>
    <el-button type="text" v-if="!isEdit" @click="isEdit = true">{{mode.text}}</el-button>
    <el-form ref="form" :inline="true" :model="mode" v-if="isEdit" :role="role" size="mini">
      <el-form-item>
        <el-input v-model="mode.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">{{$t('botton.submit')}}</el-button>
        <el-button type="info" @click="cancel">{{$t('botton.cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </span>
</template>

<script>
export default {
  name: "EditText",
  data() {
    return {
      isEdit: false,
      mode: {
        text: ""
      },
      role: {}
    };
  },
  props: ["value", "required"],
  mounted() {
    this.mode.text = this.value;
    if (this.required && this.required.bol) {
      this.role = {
        text: [
          { required: this.required.bol, message: this.required.message, trigger: "blur" }
        ]
      };
    }
  },
  methods: {
    cancel() {
      this.isEdit = false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if(valid){
          this.$emit('change', this.mode.text);
          this.isEdit = false;
        }
      });
    }
  }
};
</script>

<style>
</style>