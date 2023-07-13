import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    row:{},
    isFromDetail:false
  },
  getters: {
  },
  mutations: {
    setRow(state,playload){
      state.row = playload
    },
    ChangeIsFromDetail(state,playload){
      state.isFromDetail=playload
    }
  },
  actions: {
  },
  modules: {
  }
})
