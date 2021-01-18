const state = {
  node: {
    data:{
      type:null
    }
  }
}
const mutations = {
  SET_NODE: (state, node) => {
    state.node = node
  },
}

const actions = {
  setNode({commit}, node) {

    commit('SET_NODE', node)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
