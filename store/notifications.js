export const state = () => ({
  notificationsList: [],
})

export const mutations = {
  setNotificationsList (state, notificationsList) {
    state.notificationsList = notificationsList
  }
}
