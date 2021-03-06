import Vue from 'vue';
import VueResource from "vue-resource";
import VueRouter from 'vue-router';
import Iview from 'iview';
import {appApi, appContext} from "./plugin/config";
import {initRouter, router, routerStore} from "./plugin/router";
import interceptor from './plugin/interceptor'
import installDirective from "./plugin/install_directive"//don't delete,let vue install
import SoulUi from "./plugin/install_component"
import Store from './store/index'
import manageApp from './view/esview/app.vue'
import Login from './view/esview/login.vue'
import locale  from 'iview/dist/locale/en-US';
import 'iview/dist/styles/iview.css'
import './style/index.less'

import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

Vue.dev = true

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(SoulUi)
Vue.use(Iview, {locale})

Vue.http.options.root = appContext.apiUrl;

let config = {
  appApi: appApi,
  initRouter: initRouter,
  routerStore: routerStore
}

const app = new Vue({
  store: Store,
  router: router,
  render (h) {
    if (!Store.getters['userModule/me']) {
      return h(Login)
    }

    switch (Store.getters['userModule/page']) {
      case 'manage':
        return h(manageApp)
      case 'login':
        return h(Login)
    }
  }
})

app.$mount('#app');
interceptor(Vue, app)
