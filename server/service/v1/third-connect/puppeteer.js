const puppeteer = require('puppeteer')
const moment = require('moment')

const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
  '--enable-automation',
]

const blocked_domains = [
  'googlesyndication.com',
  'adservice.google.com',
  'googleads.g.doubleclick.net',
  'googletagservices.com',
]

module.exports = class PuppeteerService {
  startBrowser = async (req, res) => {
    let browser
    let page
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: minimal_args,
        executablePath: '/usr/bin/chromium-browser',
      })
      page = await browser.newPage()
      await page.setExtraHTTPHeaders({
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'upgrade-insecure-requests': '1',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,en;q=0.8',
      })

      await this.blockUnnessesaryRequest(page)

      console.log('Already blocked domain')

      await page.goto('https://masothue.com/')

      console.log('Tab https://masothue.com/ are ready to use')

      return { page, browser, status: true }
    } catch (error) {
      console.log('openTab error' + error)

      return { page, browser, status: false }
    }
  }

  catchScreenShot = async (page) => {
    return await page.screenshot({
      path: `uploads/puppeteer/${moment().format('DDMMYYYY-HHmmss')}.png`,
      fullPage: true,
    })
  }

  handleCatching = () => {
    try {
      let blockItem = ['modal-inform']
    } catch (error) {}
  }

  search = async (req, res) => {
    let browser
    try {
      const { page, browser: brows, status: isBrowserReady } = await this.startBrowser()

      browser = brows

      let selector = 'input[name="q"]'

      let actionSelector = 'button[type="submit"]'

      let mainContent = '#main section .container'

      let query = req.body?.q?.toLowerCase()

      if (!query) throw { message: 'Invalid query string' }

      // console.log('waiting for Query')

      const listQuery = [
        '#main section .container table.table-taxinfo thead span',
        '#main section .container div.tax-listing div h3',
      ]

      if (!isBrowserReady) throw { message: 'Browser was error' }

      // this.catchScreenShot(page)
      // setTimeout(() => {
      //   this.catchScreenShot(page)
      // }, 10000)
      await page.waitForSelector(selector)

      // console.log('Founded Input')

      await page.$eval(selector, (el, v) => (el.value = v), query)

      await page.click(actionSelector)

      // console.log('begin search modal-inform')

      await this.delay(250)

      let isModalShow = await page.evaluate((value) => {
        // console.log('search Modal')

        let modal = document.querySelector('#modal-inform')

        if (modal && modal.style.display === 'block') {
          return {
            status: true,
            message: modal.querySelector('.modal-body').innerHTML || modal.querySelector('.modal-body').innerText,
          }
        }
        return { status: false, message: 'Modal not found' }
      })

      if (isModalShow.status) {
        throw isModalShow
      }

      // console.log('begin Navigation')

      await page.waitForSelector(mainContent, { timeout: 2000 })

      // console.log('begin search item')

      const text = await page.evaluate((v) => {
        let html = []
        for (let i = 0; i < v.length; i++) {
          let itemQuery = v[i]
          let target = document.querySelector(itemQuery)
          if (target) {
            html.push(target?.textContent || target?.innerHTML)
            break
          }
        }
        return html
      }, listQuery)

      // return res.status(200).json({
      //   message: 'done',
      //   data: text,
      // })
      return {
        message: 'Search company success',
        data: text,
      }
    } catch (error) {
      console.log('search error: ' + JSON.stringify(error, null, 2))

      // return res.status(400).json({
      //   error,
      // })
      return {
        message: 'Search company Error',
        data: error,
      }
    } finally {
      browser.close()
    }
  }

  blockUnnessesaryRequest = async (page) => {
    try {
      await page.setRequestInterception(true)
      page.on('request', (request) => {
        const url = request.url()
        if (blocked_domains.some((domain) => url.includes(domain))) {
          request.abort()
        } else {
          request.continue()
        }
      })
    } catch (error) {
      console.log('blockUnnessesaryRequest error:', error)
    }
  }

  delay = (time) => {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    })
  }
}
