export const state = () => ({
  sidebarIsOpen: false
})

export const mutations = {
  setSidebarStatus (state, sidebarStatus) {
    state.sidebarIsOpen = sidebarStatus
  }
}
