<template>
  <div class="page-container">
    <div class="page-header">
      <el-page-header @back="goBack">
        <template slot="content">
          <i class="iconfont icon-weighing-scale2"></i>
          <span>{{this.$t("facilitie.streetlight_manage")}}</span>
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
          <el-table-column prop="name" :label="$t('facilitie.facilitie_number')">
            <template slot-scope="scope">
              <el-button type="text" @click="toDetailPage(scope.row.id)">{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="$t('common.status')" width="120">
            <template slot-scope="scope">{{ scope.row.goodsStatus|commodity_status }}</template>
          </el-table-column>
          <el-table-column prop="account" :label="$t('common.position')"></el-table-column>
          <el-table-column prop="createTime" :label="$t('common.create_time')" width="180">
            <template slot-scope="scope">{{ scope.row.createTime|common_date_format }}</template>
          </el-table-column>
          <el-table-column prop="updateTime" :label="$t('common.update_time')" width="180">
            <template slot-scope="scope">{{ scope.row.updateTime|common_date_format }}</template>
          </el-table-column>
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
        <!-- <delete-dialop ref="deleteDialop" @confirm="batchDelete"></delete-dialop>
        <create-dialop ref="createDialop" @created="getTableDataList"></create-dialop> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  methods: {
    goBack() {
      this.$router.back();
    },
    tablePageSizeChange(val) {
      this.tableCurrentPageSize = val;
    },
    tablePageCurrentChange(val) {
      this.tableCurrentPage = val;
      this.getTableDataList();
    },
    tableSelectionChange(val) {
      this.tableSelected = val;
    },
    getTableDataList() {
      this.loading = true;
      apiGetPage({
        "page.current": this.tableCurrentPage,
        "page.size": this.tableCurrentPageSize
      })
        .then(res => {
          this.loading = false;
          this.tableDataTotal = res.data.total;
          this.tableData = res.data.records;
        })
        .catch(e => {
          this.loading = false;
          this.$message.error(this.$t("message.get_data_fail"));
        });
    },
    updateData(id, param) {
      // this.loading = true;
      // apiUpdate(id, param)
      //   .then(res => {
      //     this.loading = false;
      //     this.getTableDataList();
      //   })
      //   .catch(e => {
      //     this.loading = false;
      //     this.getTableDataList();
      //     this.$message.error(this.$t("message.update_fail"));
      //   });
    },
    showDeleteDialop() {
      // let deleteList = [];
      // this.tableSelected.forEach(i => {
      //   deleteList.push({
      //     id: i.id,
      //     label: i.name
      //   });
      // });
      // this.$refs["deleteDialop"].init(deleteList);
    },
    toCreatePage() {
      // this.$router.push({
      //   path: "/commodity/detail?action=create"
      // });
    },
    toDetailPage(id) {
      // this.$router.push({
      //   path: "/commodity/detail?action=detail&commodity-id=" + id
      // });
    },
    batchDelete() {
      // let allPromise = [];
      // this.tableSelected.forEach(row => {
      //   allPromise.push(apiDelete(row.id));
      // });
      // this.loading = true;
      // Promise.all(allPromise)
      //   .then(results => {
      //     this.loading = false;
      //     this.getTableDataList();
      //   })
      //   .catch(e => {
      //     this.loading = false;
      //     this.getTableDataList();
      //     this.$message.error(this.$t("message.delete_fail"));
      //   });
    }
  }
}
</script>

<style>

</style>
