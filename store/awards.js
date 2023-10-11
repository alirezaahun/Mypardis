export const state = () => ({
  categories: []
})

export const mutations = {
  setCategoriesList (state, categoriesList) {
    state.categories = categoriesList
  }
}
