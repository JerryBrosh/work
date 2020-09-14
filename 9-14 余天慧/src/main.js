import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElemmentUI from "element-ui";
import Axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElemmentUI);
Vue.prototype.$axios=Axios;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
