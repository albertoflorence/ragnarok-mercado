export const filterBySoldItems = (currentShops, oldShops) => soldItems(currentShops, oldShops)

export const filterByShop = (data, shopName) =>
  data.filter(({ shop_name }) => compare(shop_name, shopName))

export const filterByOption = (data, optionsFilter, id = '') =>
  filterItems(
    data,
    ({ options, ...item }) =>
      filterByIDName(item, id) &&
      Object.keys(optionsFilter).every(
        i =>
          !optionsFilter[i].key ||
          (options[i] &&
            (' ' + options[i]).includes(optionsFilter[i].key) &&
            between(
              options[i].match(/\d+/) || 0,
              optionsFilter[i].min || -Infinity,
              optionsFilter[i].max || +Infinity
            ))
      )
  )

export const getItem = (data, filter = '') =>
  filterItems(data, item => filterByIDName(item, filter))

const filterByIDName = (item, filter) =>
  parseInt(filter) ? item.nameid === parseInt(filter) : compare(item.name, filter)

const filterItems = (data, cb) =>
  data
    .map(({ items, ...rest }) => ({
      ...rest,
      items: items.filter(cb)
    }))
    .filter(e => e.items[0])
    .sort(orderByPrice)

const compare = (str1, str2) => str1.toLowerCase().includes(str2.toLowerCase())
const between = (number, min, max) => parseInt(number) >= min && parseInt(number) <= max

const orderByPrice = (a, b) =>
  Math.min(...a.items.map(({ price }) => price)) - Math.min(...b.items.map(({ price }) => price))

const filterByVendor = (data, charName) => data.find(({ char_name }) => charName === char_name)

const diff = (a = [], b = []) =>
  a.map(
    function (item, i) {
      const key = item.nameid + item.price + item.options.join('')
      const bAmount = this.get(key)
      bAmount > 0 && this.set(key, bAmount - 1)
      return {
        ...item,
        amountSold: Math.max(item.amount - (bAmount || 0), 0)
      }
    },
    b.reduce(
      (map, { nameid, price, amount, options }) =>
        map.set('key', nameid + price + options.join('')) &&
        map.set(map.get('key'), (map.get(map.get('key')) || amount - 1) + 1),
      new Map()
    )
  )

const soldItems = (currentShops, oldShops) =>
  oldShops.map(({ char_name, items, ...shop }) => ({
    ...shop,
    char_name,
    items: diff(items, filterByVendor(currentShops, char_name)?.items)
  }))
