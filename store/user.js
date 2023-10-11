export const state = () => ({
  user: null,
  fetchUserIsLoading: false
})

export const mutations = {
  setUser (state, userData) {
    state.user = userData
  },
  setUserLoading (state, userLoading) {
    state.fetchUserIsLoading = userLoading
  }
}
