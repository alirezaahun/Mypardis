export const advertisement = {
  newAds: '/v1/newAds',
  getAllAds: '/v1/advertising',
  store: '/v1/advertising',
  getCategoryWithAds: '/v1/getCategoryWithAds',
  favoriteAds: '/v1/favoriteAds',
  getAdvertisingByCategory: (id) => `/getAdvertisingByCategory/${id}`,
  getReportage: '/v1/reportage',
  report: (id) => `/v1/report/${id}`,
  likeOrDisLike: (id) => `/v1/likeOrDisLike/${id}`,
  getById: (id) => `/v1/advertising/${id}`,
  delete: (id) => `/v1/advertising/${id}`,
  edit: (id) => `/v1/advertising/${id}`,
  getAttribute: (id) => `/v1/getAttribute/category/${id}`,
  getBookmarks: '/v1/getBookmarks'
}
