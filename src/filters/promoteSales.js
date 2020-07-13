import i18n from '@/language'

export const status = (value) => {
  let result = i18n.t("promote_sales.status_unkonw");
  if(value === 0){
    result = i18n.t("promote_sales.status_deleted");
  }else if(value === 1){
    result = i18n.t("promote_sales.status_normal");
  }
  return result;
}