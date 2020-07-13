import i18n from '@/language'

export const status = (value) => {
  let result = i18n.t("commodity.status_unkonw");
  if(value === 0){
    result = i18n.t("commodity.status_deleted");
  }else if(value === 1){
    result = i18n.t("commodity.status_up");
  }else if(value === 2){
    result = i18n.t("commodity.status_down");
  }
  return result;
}