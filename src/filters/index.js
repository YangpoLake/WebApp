import * as commonFilter from './common';
import * as commodityFilter from './commodity';
import * as promoteSalesFilter from './promoteSales';

export default {
  'common_date_format': commonFilter.dateFormat,
  'common_assets_path': commonFilter.assetsPathFilter,
  'common_assets_path_reverse': commonFilter.assetsPathReverseFilter,
  'commodity_status': commodityFilter.status,
  'promote_sales_status': promoteSalesFilter.status
}