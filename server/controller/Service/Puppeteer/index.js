const puppeteer = require('puppeteer')
const moment = require('moment')

module.exports = class PuppeteerController {
  openTab = async () => {
    let browser
    let page
    try {
      browser = await puppeteer.launch({ headless: true })

      console.log('Browser is launched')

      page = await browser.newPage()

      await page.goto('https://masothue.com/')

      // await page.waitForNavigation()

      console.log('Tab https://masothue.com/ are ready to use')

      return { page, browser, status: true }
    } catch (error) {
      console.log('openTab error' + error)

      return { page, browser, status: false }
    }

    // const inputSearch = 'input[name=q]'

    // const listQuery = ['#main section .container table.table-taxinfo thead span', '#main section .container div.tax-listing div h3']

    // await page.waitForSelector(inputSearch)

    // await page.$eval(inputSearch, (el, v) => (el.value = v), params)

    // await page.click('button[type="submit"]')

    // await page.waitForNavigation()

    // await page.waitForSelector('#main section .container', { timeout: 5000 })

    // const text = await page.evaluate((v) => {
    //   let html = []
    //   for (let i = 0; i < v.length; i++) {
    //     let itemQuery = v[i]
    //     let target = document.querySelector(itemQuery)
    //     if (target) {
    //       html.push(target?.textContent || target?.innerHTML)
    //       break
    //     }
    //   }
    //   return html
    // }, listQuery)

    // return text
  }

  startBrowser = async (url) => {
    let browser
    let page
    try {
      browser = await puppeteer.launch({ headless: true })

      console.log('Browser is launched')

      page = await browser.newPage()

      await page.goto('https://masothue.com/')

      // await page.waitForNavigation()

      console.log('Tab https://masothue.com/ are ready to use')

      return { page, browser, status: true }
    } catch (error) {
      console.log('openTab error' + error)

      return { page, browser, status: false }
    }
  }

  waitForElementReady = async (selector, query, page) => {
    try {
      // const inputSearch = 'input[name=q]'

      // const listQuery = ['#main section .container table.table-taxinfo thead span', '#main section .container div.tax-listing div h3']

      await page.waitForSelector(selector)

      await page.$eval(selector, (el, v) => (el.value = v), query)

      // await page.screenshot({ path: `uploads/puppeteer/input.png`, fullPage: true });
      await page.click('button[type="submit"]')

      await page.waitForNavigation()

      await page.waitForSelector('#main section .container', { timeout: 5000 })
    } catch (error) {
      console.log('getAttribute error: ' + error)
    } finally {
      return page
    }
  }

  catchScreenShot = async () => {
    return await page.screenshot({
      path: `uploads/puppeteer/${moment().format('DDMMYYYY-HHmm')}.png`,
      fullPage: true,
    })
  }

  handleCatching = () => {
    try {
      let blockItem = ['modal-inform']
    } catch (error) {}
  }

  search = async (req, res) => {
    const { page, browser, status: isBrowserReady } = await this.startBrowser()

    let selector = 'input[name=q]'
    let query = req.body.q

    if (isBrowserReady) {
    }

    return res.status(200).json({
      message: 'done',
    })
  }
}
