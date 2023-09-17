const PuppeteerService = require('@service/v1/third-connect/puppeteer')

module.exports = class PuppeteerController {
  constructor() {}

  onSearch = async (req, res) => {
    try {
      const data = await new PuppeteerService().search(req, res)
      return res.status(200).json(data)
    } catch (error) {
      console.log('Puppeteer Search error', error)
      return res.status(400).json({
        error,
      })
    }
  }
}
