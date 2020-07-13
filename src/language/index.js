import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zh', // 定义默认语言为中文 
  messages: {
    'zh': require('./zh.json'),
    'en': require('./en.json')
  }
});

export default i18n;