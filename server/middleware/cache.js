const apicache = require('apicache')

const onlyStatus200 = (req, res) => res.statusCode === 200
const cache = apicache.options({
  // debug: true,
}).middleware

const caching = (params) => cache(params, onlyStatus200)

const cachingGroup = (req, res, next) => {
  // console.log(req)
  const stringify = JSON.stringify({
    url: req.originalUrl,
    method: req.method,
  })
  console.log(`Cache Name : ${stringify}`)
  req.apicacheGroup = stringify
  next()
}

const clearCachingGroup = ({ url, method }) => {
  const cacheName = JSON.stringify({ url, method })
  apicache.clear(cacheName)
}

module.exports = {
  caching,
  cachingGroup,
  clearCachingGroup,
}
