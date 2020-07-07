import Vuex from 'vuex'
import getters from './getters'
import modules from './modules'

const store = new Vuex.Store({
  modules,
  getters
})

export default store
