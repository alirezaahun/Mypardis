export const state = () => ({
  favoriteAds: [],
  categoryWithAds: []
})

export const mutations = {
  setFavoriteAds (state, favoriteAds) {
    state.favoriteAds = favoriteAds
  },
  setCategoryWithAds (state, categoryWithAds) {
    state.categoryWithAds = categoryWithAds
  }
}
