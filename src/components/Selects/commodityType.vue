<template>
  <span>
    <el-select
      v-if="mode != 'detail'"
      v-model="value"
      placeholder="请选择"
      style="width: 100%;"
      @change="onChange"
    >
      <el-option v-for="item in typeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
    </el-select>
    <span v-if="mode === 'detail'">{{ getTypeNameById(value) }}</span>
  </span>
</template>

<script>
import { getTypePage as apiGetTypePage } from "@/api/commodity";
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["value", "mode"],
  data() {
    return {
      typeList: []
    };
  },
  mounted() {
    this.getTypelist();
  },
  methods: {
    getTypelist() {
      apiGetTypePage({}).then(res => {
        this.typeList = res.data;
      });
    },
    getTypeNameById(id){
      let result = "";
      this.typeList.forEach(type => {
        if(type.id === id){
          result = type.typeName;
        }
      });
      return result;
    },
    onChange(event) {
      this.$emit("change", event);
      this.$emit("input", event);
    }
  }
};
</script>

<style>
</style>