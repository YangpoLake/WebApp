<template>
  <el-dialog :title="$t('dialop.delete')" :visible.sync="visible" width="30%">
    <p>{{ $t('dialop.delete_tips') }}</p>
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.label }}</li>
    </ul>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{ $t('botton.cancel') }}</el-button>
      <el-button type="primary" @click="confirm">{{ $t('botton.confirm') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data(){
    return {
      visible: false,
      list: []
    }
  },
  methods: {
    init(list){
      this.list = list;
      this.visible = true;
    },
    confirm() {
      this.$emit('confirm', this.list);
      this.visible = false;
    }
  }
};
</script>

<style>
</style>