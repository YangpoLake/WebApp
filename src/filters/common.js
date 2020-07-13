import { formatDate } from "element-ui/src/utils/date-util";

export const dateFormat = (value) => {
  return formatDate(value, 'yyyy-MM-dd hh:mm:ss');
}

export const assetsPathFilter = (value = "") => {
  return value ? value.replace(/{{assetsUrl}}/g, process.env.VUE_APP_ASSETS_PATH) : "";
}

export const assetsPathReverseFilter = (value = "") => {
  return value ? value.replace(new RegExp(process.env.VUE_APP_ASSETS_PATH, 'g'), '{{assetsUrl}}') : "";
}

