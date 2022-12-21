const dayjs = require('dayjs')

const filterTimes = (val, format = 'YYYY-MM-DD') => {
  if (!isNull(val)) {
    val = parseInt(val) * 1000
    return dayjs(val).format(format)
  } else {
    return '--'
  }
}
const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}
export const isNull = (date) => {
  if (!date) return true
  if (JSON.stringify(date, getCircularReplacer()) === '{}') return true
  if (JSON.stringify(date, getCircularReplacer()) === '[]') return true
}
// vue的全局属性
export default (app) => {
  app.config.globalProperties.$filters = {
    filterTimes,
    isNull
  }
}
