<template>
  <el-dialog :title="$t('dialop.create')" :visible.sync="visible" width="30%">
    <el-form ref="form" label-position="right" label-width="80px" :model="mode" v-loading="loading" size="small">
      <el-form-item :label="$t('commodity.name')" prop="name">
        <el-input v-model="mode.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('commodity.status')" prop="status">
        <el-switch
          v-model="mode.status"
          :active-text="this.$t('commodity.status_up')"
          :inactive-text="this.$t('commodity.status_down')"
          :active-value="'up'"
          :inactive-value="'down'"
        ></el-switch>
      </el-form-item>
      <el-form-item :label="$t('commodity.selling_price')" prop="sellingPrice">
        <el-input type="number" v-model="mode.sellingPrice"></el-input>
      </el-form-item>
      <el-form-item :label="$t('commodity.purchase_price')" prop="purchasePrice">
        <el-input type="number" v-model="mode.purchasePrice"></el-input>
      </el-form-item>
      <el-form-item :label="$t('commodity.stock')" prop="stock">
        <el-input type="number" v-model="mode.stock"></el-input>
      </el-form-item>
      <el-form-item :label="$t('commodity.packing')" prop="packing">
        <el-input type="number" v-model="mode.packing"></el-input>
      </el-form-item>
      <el-form-item :label="$t('commodity.description')" prop="description">
        <el-input type="textarea" :rows="2" v-model="mode.description"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{ $t('botton.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('botton.submit') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { create as apiCreate } from "@/api/commodity";
export default {
  data() {
    return {
      loading: false,
      visible: false,
      mode: {
        name: "",
        status: "up",
        sellingPrice: 0,
        purchasePrice: 0,
        stock: 0,
        packing: 0,
        description: ""
      },
      role: {
        name: [
          {
            required: true,
            message:
              this.$t("commodity.name") + this.$t("form_role_message.required"),
            trigger: "blur"
          }
        ],
        sellingPrice: [
          {
            required: true,
            message:
              this.$t("commodity.selling_price") +
              this.$t("form_role_message.required"),
            trigger: "blur"
          }
        ],
        purchasePrice: [
          {
            required: true,
            message:
              this.$t("commodity.purchase_price") +
              this.$t("form_role_message.required"),
            trigger: "blur"
          }
        ],
        stock: [
          {
            required: true,
            message:
              this.$t("commodity.stock") +
              this.$t("form_role_message.required"),
            trigger: "blur"
          }
        ],
        packing: [
          {
            required: true,
            message:
              this.$t("commodity.packing") +
              this.$t("form_role_message.required"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    init() {
      this.visible = true;
      this.mode = {
        name: "",
        status: "up",
        sellingPrice: 0,
        purchasePrice: 0,
        stock: 0,
        packing: 0,
        description: ""
      };
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          apiCreate(this.mode)
            .then(res => {
              this.loading = false;
              this.$emit("created");
              this.$message.success(this.$t("message.create_success"));
              this.visible = false;
            })
            .catch(e => {
              this.loading = false;
              this.$message.error(this.$t("message.create_fail"));
            });
        }
      });
    }
  }
};
</script>

<style>
</style>