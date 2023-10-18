const axios = require('axios')

module.exports = class PuppeteerService {
  search = async (req) => {
    const { q } = req.body
    try {
      const headersClone = JSON.parse(JSON.stringify(req.headers))

      let url = 'http://puppeteer-service:3002/api/service/search'

      const resp = await axios.post(url, { q }, { headers: { ...headersClone } })

      const data = resp.data

      return data

    } catch (error) {

      throw error

    }
  }
}
