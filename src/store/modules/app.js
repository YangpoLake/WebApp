import { setLanguage } from "../../utils/cookies";
import { getLocale } from "../../lang";

const state = {
  language: getLocale(),
} 

const mutations = {
  SET_LANGUAGE(state, language) {
    state.language = language;
    setLanguage(this.language);
  }
}

const actions = {
  SetLanguage({ commit }, language) {
    commit("SET_LANGUAGE", language);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
