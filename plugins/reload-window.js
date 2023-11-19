import { auth } from "~/shared/api";

export default function (content) {
  window.addEventListener('load', onReloadWindow)

  async function onReloadWindow () {
    try {
      content.store.commit('user/setUserLoading', true)
      const { data } = await content.$Api.get(auth.getUserDetail, { loading: 'BLOCKER' })
      if (!data) {
        return
      }

      content.store.commit('user/setUser', data)
    } finally {
      content.store.commit('user/setUserLoading', false)
    }
  }
}
