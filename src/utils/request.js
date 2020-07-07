import axios from "axios";
import { debounce } from "lodash";
import { ElMessage as Message } from "element-ui";
import i18n from "../lang";
import router from "../router";
import authModule from "../store/modules/auth.js";
import appModule from "../store/modules/app.js";

const responseStatus401 = debounce((res) => {
  if (res.config.url !== "/api/tunny/logout") { // 登出接口发生鉴权失败是不做处理
    authModule.LogOut();
  }
  router.push("/login");
}, 2000);
const responseStatus504 = debounce(() => {
  Message({
    message: i18n.t("requestTimeout").toString(),
    type: "warning"
  });
}, 2000);
const responseStatus500 = debounce(() => {
  Message({
    message: i18n.t("requestError").toString(),
    type: "warning"
  });
}, 2000);

function createService(baseURL = "/") {
  const service = axios.create({
    baseURL: baseURL, // url = base url + request url
    timeout: 5000
    // withCredentials: true // send cookies when cross-domain requests
  });

  // Request interceptors
  service.interceptors.request.use(
    (config) => {
      // Add X-Access-Token header to every request, you can add other custom headers here
      if (authModule.token) {
        config.headers["X-Access-Token"] = authModule.token;
        config.headers.Authorization = "JWT " + authModule.token;
        config.headers["Content-Type"] = "application/json;charset=UTF-8";
        config.headers["Accept-Language"] = appModule.language === "zh" ? "zh-Hans" : "en-US"; // 让每个请求携带中英文标志
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  // Response interceptors
  service.interceptors.response.use(
    (response) => {
      console.log(response);
      const res = response.data;
      if (!/[2][0-9]*/.test(response.status.toString())) {
        Message({
          message: res.message || "Error",
          type: "error",
          duration: 5 * 1000
        });
        if (response.status === 401) {
          authModule.ResetToken();
          location.reload(); // To prevent bugs from vue-router
        }
        return Promise.reject(new Error(res.message || "Error"));
      } else {
        return response.data;
      }
    },
    (error) => {
      console.log(error);
      console.log(error.request);
      console.log(error.response);
      if (error.response) {
        switch (error.response.status) {
          case 401:
            responseStatus401(error.response);
            break;
          case 504:
            responseStatus504();
            break;
          case 500:
            responseStatus500();
            break;
        }
      }
      return Promise.reject(error);
    }
  );

  return service;
}

export const authRequest = createService(process.env.VUE_APP_AUTN_BASE_API);
export const mainRequest = createService(process.env.VUE_APP_MAIN_BASE_API);
