// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Vuex from 'vuex'
import * as types from './types'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: '6kfqE4tc0Zyje4XArQiviEGt'
})

Vue.use(MintUI)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.http.options.emulateJSON = true;

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    token: null,
    userinfo:{},
  },
  mutations: {
      ['setinfo']: (state, data) => {
          state.userinfo = data;
      },
      [types.LOGIN]: (state, data) => {
          localStorage.token = data;
          state.token = data;
      },
      [types.LOGOUT]: (state) => {
          localStorage.removeItem('token');
          state.token = null
          state.userinfo = null
      },
  }
})

if (window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/runhome',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
