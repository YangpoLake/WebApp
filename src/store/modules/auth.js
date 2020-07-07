import { removeToken } from "../../utils/cookies";
import { resetRouter } from "../../router";
import * as authApi from "../../api/authApi";

const state = {
  token: "",
  userId: 0,
  username: "",
  avatar: "",
  roles: []
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER_ID(state, userId) {
    state.userId = userId;
  },
  SET_USER_NAME(state, username) {
    state.username = username;
  },
  SET_ROLES(state, roles) {
    state.roles = roles;
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  }
}

const actions = {
  async Login({ commit }, userInfo) {
    const token = await authApi.login(userInfo);
    setToken(token);
    commit("SET_TOKEN", token);
  },
  LogOut({ commit }) {
    if (this.token === "") {
      throw Error("LogOut: token is undefined!");
    }

    authApi.logout().then();

    removeToken();
    resetRouter();
    commit('SET_TOKEN', "");
    commit('SET_ROLES', []);
  },
  async GetUserInfo({ commit }) {
    if (this.token === "") {
      throw Error("GetUserInfo: token is undefined!");
    }
    const loginUser = await authApi.getUserSelf();
    
    commit("SET_USER_ID", loginUser.id);
    commit("SET_USER_NAME", loginUser.username);
    commit("SET_ROLES", loginUser.roles);
  },
  ResetToken({ commit }) {
    removeToken();
    commit("SET_TOKEN", "");
    commit("SET_ROLES", []);
  },
  async Refresh({ commit }) {
    const token = await authApi.apiRefreshToken(this.token);
    setToken(token);
    commit("SET_TOKEN", token);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
