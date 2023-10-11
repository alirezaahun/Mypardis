export const state = () => ({
  news: [],
})

export const mutations = {
  setNews (state, news) {
    state.news = news
  },
}
