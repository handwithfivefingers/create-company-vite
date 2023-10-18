const axios = require('axios')

module.exports = class PuppeteerService {
  search = async (req) => {
    const { q } = req.body
    try {
      // const headersClone = JSON.parse(JSON.stringify(req.headers))

      let url = 'http://puppeteer-service:3002/api/service/search'

      const headersClone = JSON.parse(JSON.stringify(req.headers))

      const resp = await axios.post(url, { q } , { headers: {
        host: headersClone['host'],
        'user-agent': headersClone['user-agent'],
        accept: headersClone['accept'] || 'application/json',
        'accept-encoding': headersClone['accept-encoding'] || 'gzip, deflate, br',
        'accept-language': headersClone['accept-language'] || 'en,vi-VN;q=0.9,vi;q=0.8,en-US;q=0.7,ja;q=0.6',
      }})

      const data = resp.data

      return data
    } catch (error) {
      throw error
    }
  }
}
