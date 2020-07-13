<template>
  <span>
    <el-input v-model="showValue" placeholder="请输入内容" @change="onChange" v-if="mode != 'detail'"></el-input>
    <span v-if="mode === 'detail'">{{ showValue }}</span>
  </span>
</template>

<script>
export default {
  data(){
    return{
      showValue: 0
    }
  },
  props: ['value', 'mode'],
  model: {
    prop: "value",
    event: "change"
  },
  mounted(){
    this.showValue = this.value/100 || 0;
  },
  watch: {
    value(news, old){
      this.showValue = this.value/100 || 0;
    }
  },
  methods: {
    onChange(event) {
      this.$emit("change", event * 100);
      this.$emit("input", event * 100);
    }
  }
}
</script>

<style>

</style>