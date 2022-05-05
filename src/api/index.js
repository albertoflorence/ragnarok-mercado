import { fakeData } from './data'

const createFetch = ({ baseUrl }) => ({
  get: url => fetch(baseUrl + url, { method: 'GET' }).then(r => r.json())
})

const baseUrl = 'https://ws.ragnawave.com.br/mercado/list'

const api = createFetch({ baseUrl })

export default api

export const getData = (page = 1, data = {}) => new Promise(resolve => resolve(fakeData))
// api
//   .get("?page=" + page)
//   .then(({ rows, ...info }) => ({
//     rows: page === 1 ? rows : data.rows.concat(rows),
//     ...info,
//   }))
//   .then(v => (data = v))
//   .then(v => (v.maxPages > page ? getData(page + 1, data) : v))

export const saveOldShops = (oldShops = []) =>
  localStorage.setItem('oldShops', JSON.stringify(oldShops))
export const getOldShops = () => {
  const items = localStorage.getItem('oldShops')
  return items ? JSON.parse(items) : []
}
