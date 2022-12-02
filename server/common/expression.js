const expressions = require('angular-expressions')

const { assign, last, filter, ...lodash } = require('lodash')

const moment = require('moment')

expressions.filters.lower = function (input) {
  if (!input) return input
  return input.toLowerCase()
}

expressions.filters.upper = function (input) {
  if (!input) return input
  return input.toUpperCase()
}

expressions.filters.divideBy = function (input, num) {
  if (!input) return input
  return input / num
}

expressions.filters.formatNumber = function (input, type) {
  if (!input) return input
  let val = input.toString()
  val = val.split('').reverse() //
  let len = Math.round(val.length / 3)
  let output = []
  for (let i = 0; i <= len; i++) {
    let typeOutput = val.length > 3 ? type : ''
    let Poutput = [...val.splice(0, 3), typeOutput]
    output.push(...Poutput)
  }
  let result = output.reverse().join('')

  return result || ''
}

expressions.filters.formatDate = function (input, type = null) {
  if (!input) return input
  let val = input.toString()
  if (!val) ''
  else return moment(val).format(type ? type : '[ngày] DD [tháng] MM [năm] YYYY')
}

expressions.filters.where = function (input, query) {
  return input.filter(function (item) {
    let result = expressions.compile(query)(item)
    return result
  })
}

expressions.filters.toFixed = function (input, precision) {
  if (!input) return input
  return input.toFixed(precision)
}

module.exports = expressions
