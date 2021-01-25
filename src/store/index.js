import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    UPDATE_LIST(state, payload) {
      state.list = payload
    },
    PUSH_ON_LIST(state, payload) {
      state.list.push(...payload)
    },
  },
  actions: {
    api(context, payload) {
      return axios.get(`https://api.pokemontcg.io/v1/${payload.routePage}${payload.params ? '?' + payload.params : ''}`)
      .catch(function (error) {
        console.log(error.response);
      })
    }
  },
  modules: {
  }
})
