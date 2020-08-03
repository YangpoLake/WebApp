<template>
  <el-dialog title="Banner海报" :visible.sync="visible" width="30%" :before-close="close">
    <el-form label-position="left" label-width="80px" :model="formData" v-loading="loading">
      <el-form-item label="名称" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="category">
        <el-select v-model="formData.category" placeholder="请选择">
          <el-option label="游客端" :value="0"></el-option>
          <el-option label="运维端" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跳转地址" prop="url">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="is_show">
        <el-switch v-model="formData.is_show" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.number="formData.sort"></el-input>
      </el-form-item>
      <el-form-item :label="$t('tourist.image_url')" prop="images_url">
        <el-upload
          class="image-uploader"
          action=""
          :show-file-list="false"
          :http-request="uploadImage"
          v-loading="uploadLoading"
        >
          <img v-if="formData.images_url" :src="formData.images_url" class="image-uploader-image" />
          <i v-else class="el-icon-plus image-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="close">关闭</el-button>
      <el-button type="primary" @click="submit" :disabled="loading">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { putBannerById, postBanner } from "@/api/banner";
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
        category: 0,
        url: "",
        is_show: false,
        images_url: "",
        sort: 10,
      },
    };
  },
  methods: {
    init(id, data) {
      this.formId = id;
      this.formData = {
        title: data.title,
        category: data.category,
        url: data.url,
        is_show: data.is_show,
        images_url: data.images_url,
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
        this.formData.images_url = process.env.VUE_APP_BACKEND_SERVER_ADDR + "/" + res.data[0];
      }).finally(() => { this.uploadLoading = false; });
    },
    submit() {
      this.loading = true;
      if (this.formId) {
        putBannerById(this.formId, this.formData).then((res) => {
          this.$message.success("提交成功");
          this.$emit('success');
          this.visible = false;
        }).finally(() => { this.loading = false; });
      } else {
        postBanner(this.formData).then((res) => {
          this.$message.success("提交成功");
          this.$emit('success');
          this.visible = false;
        }).finally(() => { this.loading = false; });
      }
    },
  },
};
</script>

<style>
.image-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.image-uploader .el-upload:hover {
  border-color: #409eff;
}
.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.image-uploader-image {
  width: 178px;
  height: 178px;
  display: block;
}
</style>