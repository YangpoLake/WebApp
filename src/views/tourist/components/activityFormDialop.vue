<template>
  <el-dialog title="活动" :visible.sync="visible" width="30%" :before-close="close">
    <el-form label-position="left" label-width="80px" :model="formData" v-loading="loading">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="info">
        <el-input v-model="formData.info"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.number="formData.sort"></el-input>
      </el-form-item>
      <el-form-item :label="$t('tourist.image_url')" prop="image_url">
        <el-upload
          class="activity-uploader"
          v-loading="uploadLoading"
          :show-file-list="false"
          action=""
          :http-request="uploadImage"
        >
          <img v-if="formData.image_url" :src="formData.image_url" class="activity-image" />
          <i v-else class="el-icon-plus activity-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述" prop="details">
        <el-input type="textarea" v-model="formData.details"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="close">关闭</el-button>
      <el-button type="primary" @click="submit" :disabled="loading">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { putActivityById, postActivity } from "@/api/activity";
import { upload } from "@/api/tools"

export default {
  data() {
    return {
      loading: false,
      uploadLoading: false,
      visible: false,
      formId: null,
      formData: {
        title: "",
        image_url: "",
        info: "",
        details: "",
        sort: 10,
      },
    };
  },
  methods: {
    init(id, data) {
      this.formId = id;
      this.formData = {
        title: data.title,
        image_url: data.image_url,
        info: data.info,
        details: data.details,
        sort: data.sort,
      };
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    uploadImage(file) {
      this.uploadLoading = true;
      const form = new FormData();
      form.append("file1", file.file);
      form.append("type", "img");
      upload("img", file.file, form).then((res) => {
        this.formData.image_url = process.env.VUE_APP_BACKEND_SERVER_ADDR + "/" + res.data[0];
      }).finally(() => {
        this.uploadLoading = false;
      });
    },
    submit() {
      this.loading = true;
      if (this.formId) {
        putActivityById(this.formId, this.formData).then((res) => {
          this.$message.success("提交成功");
          this.$emit('success');
          this.visible = false;
        }).finally(() => {
          this.loading = false;
        });
      } else {
        postActivity(this.formData).then((res) => {
          this.$message.success("提交成功");
          this.$emit('success');
          this.visible = false;
        }).finally(() => {
          this.loading = false;
        });
      }
    },
  },
};
</script>

<style>
.activity-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.activity-uploader .el-upload:hover {
  border-color: #409eff;
}
.activity-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.activity-image {
  width: 178px;
  height: 178px;
  display: block;
}
</style>