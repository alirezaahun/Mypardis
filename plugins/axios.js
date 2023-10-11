export default function ({ $axios, redirect, route, store }, inject) {
  const api = $axios.create({
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('pardisnow-auth-token'),
      Accept: 'application/json'
    },
    baseURL: process.env.baseURL
  })
  const blockerLoadingMap = []
  const transparentLoadingMap = []
  const fillLoadingMap = (conf) => {
    if (conf.loading === 'BLOCKER') {
      blockerLoadingMap.push(conf.url)
      store.commit('axios/setBlockerLoading', true)
      return
    }
    if (conf.loading === 'TRANSPARENT') {
      store.commit('axios/setTransparentLoading', true)
      transparentLoadingMap.push(conf.url)
    }
  }

  const emptyLoadingMap = (conf) => {
    if (conf.loading === 'BLOCKER') {
      const index = blockerLoadingMap.findIndex(el => el !== conf.url)
      blockerLoadingMap.splice(index, 1)
      return
    }
    if (conf.loading === 'TRANSPARENT') {
      const index = transparentLoadingMap.indexOf(el => el !== conf.url)
      transparentLoadingMap.splice(index, 1)
    }
  }

  api.onRequest((req) => {
    console.log('req')
    if (req.loading) {
      const config = { url: req.url, loading: req.loading }
      fillLoadingMap(config)
    }
  })

  api.onResponse(response => {
    if (response.config.loading) {
      const config = { url: response.config.url, loading: response.config.loading }
      emptyLoadingMap(config)
    }
    if (!blockerLoadingMap.length) {
      store.commit('axios/setBlockerLoading', false)
    }
    if (!transparentLoadingMap.length) {
      store.commit('axios/setTransparentLoading', false)
    }
    switch (response.status) {
      case 200:
        // console.log('success')
        break
      case 401:
        // console.log('user is not authorization')
        break
      default:
        // console.log('complete')
    }
  })

  api.onError(error => {
    console.log('error: ', error);
    if (error.config.loading) {
      const config = { url: error.config.url, loading: error.config.loading }
      emptyLoadingMap(config)
    }
    if (!blockerLoadingMap.length) {
      store.commit('axios/setBlockerLoading', false)
    }
    if (!transparentLoadingMap.length) {
      store.commit('axios/setTransparentLoading', false)
    }
    // console.log('error: ', error.response)
    switch (error.response.status) {
      case 404:
        // console.log('not found error')
        break
      case 401:
        console.log('route.name.search(\'auth\'): ', route.name.search('auth'));
        if (route.name.search('auth') !== -1) {
          return
        }
        redirect(401, '/auth')
        break
      case 500:
        // console.log('server error')
        break
      default:
        // console.log('complete')
    }
  })

  inject('Api', api)
}
