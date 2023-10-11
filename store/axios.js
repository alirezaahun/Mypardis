export const state = () => ({
  blockerLoading: false,
  transparentLoading: false
})

export const mutations = {
  setBlockerLoading (state, loading) {
    state.blockerLoading = loading
  },
  setTransparentLoading (state, loading) {
    state.transparentLoading = loading
  },
}
