export const state = () => ({
  cashAwardsList: [],
  nonCashAwardsList: []
})

export const mutations = {
  setAwardsList (state, awards) {
    if (awards.length) {
      awards.forEach(el => {
        if (el.type === 'cash') {
          state.cashAwardsList.push(el)
        } else if (el.type === 'non-cash') {
          state.nonCashAwardsList.push(el)
        }
      })
    }
  }
}
