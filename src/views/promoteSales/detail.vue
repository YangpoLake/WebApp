<template>
  <div class="page-container">
    <div class="page-header">
      <el-page-header @back="goBack">
        <template slot="content">
          <i class="iconfont icon-label1"></i>
          <span v-if="mode === 'detail'">{{this.$t("promote_sales.promote_sales_detail")}}</span>
          <span v-if="mode === 'create'">{{this.$t("promote_sales.promote_sales_push")}}</span>
          <span v-if="mode === 'edit'">{{this.$t("promote_sales.promote_sales_edit")}}</span>
          <span class="btn-group">
            <el-button size="small" icon="el-icon-edit" @click="onEdit" v-if="mode === 'detail'">编辑</el-button>
            <el-button
              size="small"
              icon="el-icon-s-promotion"
              type="primary"
              @click="submit"
              v-if="mode === 'create'"
            >提交</el-button>
            <el-button
              size="small"
              icon="el-icon-document-checked"
              type="primary"
              @click="save"
              v-if="mode === 'edit'"
            >保存</el-button>
          </span>
        </template>
      </el-page-header>
    </div>
    <div class="page-content promote-sales-page-content">
      <el-form
        ref="form"
        class="detail-wrapper"
        label-position="right"
        label-width="120px"
        :model="detailData"
        v-loading="loading"
        size="small"
      >
        <div class="basic-info-container"></div>
        <div class="image-container"></div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getPage as apiGetPage, getDetail as apiGetDetail } from "@/api/promoteSales";
export default {
  props: ["action", "promote-sales-id"],
  data() {
    return {
      mode: "detail",
      loading: false,
      detailData: {
        name: "",
        imageUrl: ""
      },
      commodityList: []
    };
  },
  mounted() {
    if (this.action === "create") {
      this.mode = "create";
    } else if (this.action === "detail") {
      this.mode = "detail";
      this.getDetailData();
    } else if (this.action === "edit") {
      this.mode = "edit";
      this.getDetailData();
    } else {
      this.mode = "create";
    }
  },
  methods: {
    getDetailData() {
      apiGetPage().then(res => {
        let promoteSales = res.data.find(ps => ps.id === this.promoteSalesId);
        this.detailData = {
          name: promoteSales.name,
          imageUrl: promoteSales.iconUrl
        }
      });
      apiGetDetail(this.promoteSalesId).then(res => {
        this.commodityList = res.data;
      });
    }
  }
};
</script>

<style>
.promote-sales-page-content .detail-wrapper{
  display: flex;
}
.promote-sales-page-content .detail-wrapper .basic-info-container{
  flex-grow: 1;
}
.promote-sales-page-content .detail-wrapper .image-container{
  flex-grow: 1;
}
</style>