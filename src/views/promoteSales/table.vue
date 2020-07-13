<template>
  <div class="page-container">
    <div class="page-header">
      <el-page-header @back="goBack">
        <template slot="content">
          <i class="iconfont icon-label1"></i>
          <span>{{this.$t("promote_sales.promote_sales_table")}}</span>
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
              <el-button type="primary" @click="getTableDataList">{{$t('botton.search')}}</el-button>
              <el-button type="success" @click="toCreatePage">{{$t('botton.create')}}</el-button>
              <!-- <el-button
                type="danger"
                @click="showDeleteDialop"
                :disabled="tableSelected.length < 1"
              >{{$t('botton.batch_delete')}}</el-button> -->
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
          <el-table-column prop="name" :label="$t('promote_sales.name')">
            <template slot-scope="scope">
              <el-button type="text" @click="toDetailPage(scope.row.id)">{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="promoteSalesStatus" :label="$t('promote_sales.status')" width="120">
            <template slot-scope="scope">{{ scope.row.promoteSalesStatus|promote_sales_status }}</template>
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('promote_sales.createTime')">
            <template slot-scope="scope">{{ scope.row.createTime|common_date_format }}</template>
          </el-table-column>
        </el-table>
        <delete-dialop ref="deleteDialop" @confirm="batchDelete"></delete-dialop>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getPage as apiGetPage,
  updata as apiUpdate,
  deleter as apiDelete
} from "@/api/promoteSales";
import EditText from "@/components/Edits/text";
import DeleteDialop from "@/components/Dialops/deleteDialop";

export default {
  components: { EditText, DeleteDialop },
  data() {
    return {
      loading: false,
      tableSearchText: "",
      tableData: [],
      tableSelected: []
    };
  },
  mounted() {
    this.getTableDataList();
  },
  methods: {
    getTableDataList() {
      this.loading = true;
      apiGetPage()
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
        })
        .catch(e => {
          this.loading = false;
          this.$message.error(this.$t("message.get_data_fail"));
        });
    },
    tableSelectionChange(val) {
      this.tableSelected = val;
    },
    updateData(id, param) {
      this.loading = true;
      apiUpdate(id, param)
        .then(res => {
          this.loading = false;
          this.getTableDataList();
        })
        .catch(e => {
          this.loading = false;
          this.getTableDataList();
          this.$message.error(this.$t("message.update_fail"));
        });
    },
    showDeleteDialop() {
      let deleteList = [];
      this.tableSelected.forEach(i => {
        deleteList.push({
          id: i.id,
          label: i.name
        });
      });
      this.$refs["deleteDialop"].init(deleteList);
    },
    toDetailPage(id) {
      this.$router.push({
        path: "/promote_sales/detail?action=detail&promote-sales-id=" + id
      });
    },
    toCreatePage() {
      this.$router.push({
        path: "/commodity/detail?action=create"
      });
    },
    batchDelete() {
      let allPromise = [];
      this.tableSelected.forEach(row => {
        allPromise.push(apiDelete(row.id));
      });
      this.loading = true;
      Promise.all(allPromise)
        .then(results => {
          this.loading = false;
          this.getTableDataList();
        })
        .catch(e => {
          this.loading = false;
          this.getTableDataList();
          this.$message.error(this.$t("message.delete_fail"));
        });
    },
    goBack() {
      this.$router.back();
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
