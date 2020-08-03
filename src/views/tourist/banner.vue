<template>
  <div class="page-container">
    <div class="page-header">
      <el-page-header @back="goBack">
        <template slot="content">
          <i class="iconfont icon-weighing-scale2"></i>
          <span>{{this.$t("tourist.banner")}}</span>
        </template>
      </el-page-header>
    </div>
    <div class="page-content">
      <div class="container" style="flex-grow: 1;">
        <div class="table-top">
          <el-form ref="form" :inline="true" size="small">
            <el-form-item>
              <el-input v-model="tableSearchText"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getTableData">{{$t('botton.search')}}</el-button>
              <el-button type="success" @click="showBannerFormDialop(null, {})">{{$t('botton.create')}}</el-button>
              <el-button
                type="danger"
                @click="showDeleteDialop(tableSelected)"
                :disabled="tableSelected.length < 1"
              >{{$t('botton.batch_delete')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          size="small"
          @selection-change="tableSelectionChange"
          v-loading="loading"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="title" :label="$t('tourist.title')">
            <template slot-scope="scope">
              <el-button type="text" @click="showBannerFormDialop(scope.row.id, scope.row)">{{ scope.row.title }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="category" :label="$t('tourist.category')">
            <template slot-scope="scope">
              <span v-if="scope.row.category === 0">游客端</span>
              <span v-if="scope.row.category === 1">运维端</span>
            </template>
          </el-table-column>
          <el-table-column prop="images_url" :label="$t('tourist.image_url')">
            <template slot-scope="scope">
              <img :src="scope.row.images_url" style="width: 100%;" />
            </template>
          </el-table-column>
          <el-table-column prop="url" :label="$t('tourist.url')"></el-table-column>
          <el-table-column prop="is_show" :label="$t('tourist.is_show')">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.is_show" @change="changeShowState(scope.row, scope.row.is_show)" />
            </template>
          </el-table-column>
          <el-table-column prop="sort" :label="$t('tourist.sort')"></el-table-column>
          <el-table-column prop="created_at" :label="$t('tourist.created_at')"></el-table-column>
          <el-table-column prop="updated_at" :label="$t('tourist.updated_at')"></el-table-column>
          <!-- <el-table-column prop="goodsDescribe" :label="$t('commodity.description')"></el-table-column> -->
        </el-table>
        <el-pagination
          @size-change="tablePageSizeChange"
          @current-change="tablePageCurrentChange"
          :current-page="tableCurrentPage"
          :page-sizes="[10, 50, 100]"
          :page-size="tableCurrentPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataTotal"
        ></el-pagination>
      </div>
    </div>
    <banner-form-dialop ref="BannerFormDialop" @success="getTableData" />
    <delete-dialop ref="DeleteDialop" @confirm="deleteData" />
  </div>
</template>

<script>
import { getBannerByPage, deleteBannerById, putBannerById } from "@/api/banner";
import BannerFormDialop from "./components/bannerFormDialop";
import DeleteDialop from "@/components/Dialops/deleteDialop";

export default {
  components: {
    BannerFormDialop, DeleteDialop
  },
  data() {
    return {
      loading: false,
      tableSearchText: "",
      tableData: [],
      tableSelected: [],
      tableCurrentPage: 1,
      tableDataTotal: 0,
      tableCurrentPageSize: 10
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    tablePageSizeChange(val) {
      this.tableCurrentPageSize = val;
    },
    tablePageCurrentChange(val) {
      this.tableCurrentPage = val;
      this.getTableData();
    },
    tableSelectionChange(val) {
      this.tableSelected = val;
    },
    getTableData() {
      this.loading = true;
      getBannerByPage({
        page: this.tableCurrentPage,
        page_size: this.tableCurrentPageSize
      }).then((res) => {
        this.tableData = res.data;
        this.tableDataTotal = res.meta.pagination.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    showBannerFormDialop(id, formData) {
      this.$refs.BannerFormDialop.init(id, formData);
    },
    showDeleteDialop() {
      if (this.tableSelected.length < 1) {
        this.$message.warning("请至少选择一个活动");
      }
      const deleteList = [];
      this.tableSelected.forEach((selected) => {
        deleteList.push({
          id: selected.id,
          label: selected.title
        });
      });
      this.$refs.DeleteDialop.init(deleteList);
    },
    deleteData(list) {
      const allPromise = [];

      list.forEach((item) => {
        allPromise.push(deleteBannerById(item.id));
      });

      Promise.all(allPromise).then(() => {
        this.getTableData();
      });
    },
    changeShowState(row, is_show) {
      putBannerById(row.id, {
        title: row.title,
        category: row.category,
        url: row.url,
        is_show,
        images_url: row.images_url,
        sort: row.sort
      }).then(() => {
        this.getTableData();
      });
    }
  }
}
</script>

<style>

</style>
