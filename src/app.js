/**
 * Created by zhenghuiqiang on 17/8/5.
 */
import Vue from "vue";
import { sync } from "vuex-router-sync";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import axios from "axios";
import one from "./components/one.vue";
import two from "./components/two.vue";
import three from "./components/three.vue";
import four from "./components/four.vue";
import five from "./components/five.vue";
import middle from "./components/middle.vue";
import after from "./components/after.vue";

Vue.prototype.$http = axios;
Vue.use(ElementUI);
window.jQuery = window.$ = require("jquery/dist/jquery");
Vue.config.productionTip = false;
Vue.use(VueRouter);

if (sessionStorage) {
  const dynamicRoutes = [
    {
      path: "/one",
      name: "one",
      component: one,
    },
    {
      path: "/two",
      name: "two",
      component: two,
    },
    {
      path: "/three",
      name: "three",
      component: three,
    },
    {
      path: "/four",
      name: "four",
      component: four,
    },
    {
      path: "/five",
      name: "five",
      component: five,
    },
    {
      path: "/middle",
      name: "middle",
      component: middle,
    },
    {
      path: "/after",
      name: "after",
      component: after,
    },

  ];
  if (sessionStorage.getItem("login")) {
    router.addRoutes(dynamicRoutes);
  }
}

const app = new Vue({
  router,
  ...App,
});

export { app, router };
