<template>
  <div class="page-container">
    <div class="page-header">
      <el-page-header @back="goBack">
        <template slot="content">
          <i class="iconfont icon-commodity"></i>
          <span v-if="mode === 'detail'">{{this.$t("commodity.commodity_detail")}}</span>
          <span v-if="mode === 'create'">{{this.$t("commodity.commodity_push")}}</span>
          <span v-if="mode === 'edit'">{{this.$t("commodity.commodity_edit")}}</span>
          <span class="btn-group">
            <el-button
              size="small"
              icon="el-icon-edit"
              @click="onEdit"
              v-if="mode === 'detail'"
            >编辑</el-button>
            <el-button size="small" icon="el-icon-s-promotion" type="primary" @click="submit" v-if="mode === 'create'">提交</el-button>
            <el-button size="small" icon="el-icon-document-checked" type="primary" @click="save" v-if="mode === 'edit'">保存</el-button>
          </span>
        </template>
      </el-page-header>
    </div>
    <div class="page-content commodity-page-content" style="height: 0;">
      <el-form
        ref="form"
        class="md-detail-wrapper"
        label-position="right"
        label-width="120px"
        :model="detailData"
        v-loading="loading"
        size="small"
      >
        <div class="basic-info-container">
          <el-form-item :label="$t('commodity.name')" prop="name">
            <el-input v-model="detailData.name" v-if="mode != 'detail'"></el-input>
            <span v-if="mode === 'detail'">{{ detailData.name }}</span>
          </el-form-item>
          <el-form-item :label="$t('commodity.type')" prop="type">
            <commodity-type-select v-model="detailData.type" :mode="mode"></commodity-type-select>
          </el-form-item>
          <el-form-item :label="$t('commodity.status')" prop="status">
            <el-switch
              v-if="mode != 'detail'"
              v-model="detailData.status"
              :active-text="this.$t('commodity.status_up')"
              :inactive-text="this.$t('commodity.status_down')"
              :active-value="1"
              :inactive-value="2"
            ></el-switch>
            <span v-if="mode === 'detail'">{{ detailData.status|commodity_status }}</span>
          </el-form-item>
          <el-form-item :label="$t('commodity.selling_price')" prop="sellingPrice">
            <price-input v-model="detailData.sellingPrice" :mode="mode"></price-input>
          </el-form-item>
          <el-form-item :label="$t('commodity.purchase_price')" prop="purchasePrice">
            <price-input v-model="detailData.purchasePrice" :mode="mode"></price-input>
          </el-form-item>
          <el-form-item :label="$t('commodity.price_unit')" prop="priceUnit">
            <el-input v-model="detailData.priceUnit" v-if="mode != 'detail'"></el-input>
            <span v-if="mode === 'detail'">{{ detailData.priceUnit }}</span>
          </el-form-item>
          <el-form-item :label="$t('commodity.stock')" prop="stock">
            <el-input type="number" v-model="detailData.stock" v-if="mode != 'detail'"></el-input>
            <span v-if="mode === 'detail'">{{ detailData.stock }}</span>
          </el-form-item>
          <el-form-item :label="$t('commodity.packing')" prop="packing">
            <el-input type="number" v-model="detailData.packing" v-if="mode != 'detail'"></el-input>
            <span v-if="mode === 'detail'">{{ detailData.packing }}</span>
          </el-form-item>
        </div>
        <div class="image-container">
          <el-form-item :label="$t('commodity.image_url_path')" prop="imageUrlPath">
            <el-input v-model="detailData.imageUrlPath" v-if="mode != 'detail'"></el-input>
            <span v-if="mode === 'detail'">{{ detailData.imageUrlPath }}</span>
          </el-form-item>
          <el-form-item :label="$t('commodity.image_in_list')">
            <img :src="$filters.common_assets_path(detailData.imageUrlPath) + '/show_in_list.jpg'" width="90">
          </el-form-item>
          <el-form-item :label="$t('commodity.image_in_banner')">
            <el-carousel trigger="click" height="225px" style="width: 345px;">
              <el-carousel-item v-for="item in 3" :key="item">
                <img :src="$filters.common_assets_path(detailData.imageUrlPath) + '/show_in_banner_' + item + '.jpg'" width="345">
              </el-carousel-item>
            </el-carousel>
          </el-form-item>
        </div>
        <div class="md-container">
          <mavon-editor
            v-model="commodityDescription"
            :subfield="false"
            :toolbars="mdEditorOption.toolbars"
            :defaultOpen="mode != 'detail' ? 'edit' : 'preview'"
            :boxShadow="false"
            :editable="mode != 'detail'"
            :placeholder="$t('common.please_input') + $t('commodity.description')"
            @keydown="onMdKeyDown"
            @imgAdd="onMdImgAdd"
          />
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import CommodityTypeSelect from "@/components/Selects/commodityType";
import PriceInput from "@/components/Inputs/price";
import {
  create as apiCreate,
  getDetail as apiGetDetail,
  updata as apiUpdata
} from "@/api/commodity";
export default {
  components: {
    CommodityTypeSelect,
    PriceInput
  },
  props: ["action", "commodity-id"],
  data() {
    return {
      mode: "detail",
      loading: false,
      detailData: {
        name: "",
        status: 1,
        type: "",
        sellingPrice: 0,
        purchasePrice: 0,
        priceUnit: "",
        stock: 0,
        packing: 0,
        description: "",
        imageUrlPath: ""
      },
      commodityType: [],
      mdEditorOption: {
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          mark: true, // 标记
          superscript: true, // 上角标
          quote: true, // 引用
          ol: true, // 有序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          help: true, // 帮助
          code: true, // code
          subfield: true, // 是否需要分栏
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          /* 1.3.5 */
          undo: true, // 上一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true // 导航目录
        }
      }
    };
  },
  computed: {
    commodityDescription: {
      get(){
        if(this.mode === 'detail'){
          return this.$filters.common_assets_path(this.detailData.description);
        }else{
          return this.detailData.description;
        }
      },
      set(value){
        let newDescription = this.$filters.common_assets_path_reverse(value);
        this.detailData.description = newDescription;
      }
    }
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
      this.loading = true;
      apiGetDetail(this.commodityId)
        .then(res => {
          let result = res.data;
          this.loading = false;
          this.detailData = {
            name: result.goodsName,
            status: result.goodsStatus,
            type: result.typeId,
            sellingPrice: result.price,
            purchasePrice: result.purchasePrice,
            priceUnit: result.unit,
            stock: result.stock,
            packing: result.packingValue,
            description: result.goodsDescribe,
            imageUrlPath: result.imgUrl
          };
        })
        .catch(e => {
          this.loading = false;
        });
    },
    onEdit(){
      this.mode = 'edit';
    },
    onMdKeyDown(event) {
      console.log(event);
    },
    onMdImgAdd(event) {
      console.log(event);
    },
    goBack() {
      this.$router.back();
    },
    submit() {
      this.loading = true;
      apiCreate({
        goodsDescribe: this.detailData.description,
        goodsName: this.detailData.name,
        goodsStatus: this.detailData.status,
        imgUrl: this.detailData.imageUrlPath,
        packingValue: this.detailData.packing,
        price: this.detailData.sellingPrice,
        purchasePrice: this.detailData.purchasePrice,
        stock: this.detailData.stock,
        typeId: this.detailData.type,
        unit: this.detailData.priceUnit
      }).then(res => {
        this.loading = false;
        this.mode = "detail";
      }).catch(e => {
        this.loading = false;
      });
    },
    save() {
      this.loading = true;
      apiUpdata(this.commodityId, {
        goodsDescribe: this.detailData.description,
        goodsName: this.detailData.name,
        goodsStatus: this.detailData.status,
        imgUrl: this.detailData.imageUrlPath,
        packingValue: this.detailData.packing,
        price: this.detailData.sellingPrice,
        purchasePrice: this.detailData.purchasePrice,
        stock: this.detailData.stock,
        typeId: this.detailData.type,
        unit: this.detailData.priceUnit
      }).then(res => {
        this.loading = false;
        this.mode = "detail";
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>

<style>
.commodity-page-content .md-detail-wrapper {
  display: flex;
  flex-grow: 1;
  align-items: stretch;
}
.commodity-page-content .md-detail-wrapper .basic-info-container {
  flex-grow: 1;
  flex-shrink: 0;
}
.commodity-page-content .md-detail-wrapper .md-container {
  width: 375px;
  height: 100%;
}
.commodity-page-content .md-detail-wrapper .basic-info-container {
  padding: 15px;
  padding-top: 30px;
}
.commodity-page-content .md-detail-wrapper .md-container .markdown-body {
  height: 100%;
}
.commodity-page-content .md-detail-wrapper .image-container{
  flex-grow: 1;
  padding: 15px;
  padding-top: 30px;
}
</style>