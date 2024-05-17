const puppeteer = require("puppeteer");
const moment = require("moment");
const path = require("path");
const randomUseragent = require("random-useragent");

// const minimal_args = [
//   "--autoplay-policy=user-gesture-required",
//   "--disable-background-networking",
//   "--disable-background-timer-throttling",
//   "--disable-backgrounding-occluded-windows",
//   "--disable-breakpad",
//   "--disable-client-side-phishing-detection",
//   "--disable-component-update",
//   "--disable-default-apps",
//   "--disable-dev-shm-usage",
//   "--disable-domain-reliability",
//   "--disable-extensions",
//   "--disable-features=AudioServiceOutOfProcess",
//   "--disable-hang-monitor",
//   "--disable-ipc-flooding-protection",
//   "--disable-notifications",
//   "--disable-offer-store-unmasked-wallet-cards",
//   "--disable-popup-blocking",
//   "--disable-print-preview",
//   "--disable-prompt-on-repost",
//   "--disable-renderer-backgrounding",
//   "--disable-setuid-sandbox",
//   "--disable-speech-api",
//   "--disable-sync",
//   "--hide-scrollbars",
//   "--ignore-gpu-blacklist",
//   "--metrics-recording-only",
//   "--mute-audio",
//   "--no-default-browser-check",
//   "--no-first-run",
//   "--no-pings",
//   "--no-sandbox",
//   "--no-zygote",
//   "--password-store=basic",
//   "--use-gl=swiftshader",
//   "--use-mock-keychain",
//   "--enable-automation",
//   "--single-process",
// ];
const minimal_args = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
  // "--proxy-server=socks4://14.161.17.4:4153"
];

const blocked_domains = [
  "googlesyndication.com",
  "adservice.google.com",
  "googleads.g.doubleclick.net",
  "googletagservices.com",
];

module.exports = class PuppeteerService {
  constructor() {
    const myArray = [];
    this.queue = myArray;
  }

  startBrowser = async (req) => {
    try {
      const isDev = process.env.NODE_ENV === "development";
      const params = {
        headless: "new",
        args: minimal_args,
      };
      const { proxyIp } = req.body;
      params["executablePath"] = "/usr/bin/google-chrome";
      const browser = await puppeteer.launch(params);
      const incognitoParams = {};
      if (proxyIp) {
        // {
        //   proxy: "socks4://50.251.146.121:5678",
        // }
        incognitoParams["proxyIp"] = proxyIp;
      }
      const context = await browser.createIncognitoBrowserContext(
        incognitoParams
      );
      const page = await context.newPage();

      const headersClone = JSON.parse(JSON.stringify(req.headers));

      await page.setExtraHTTPHeaders({
        "user-agent": randomUseragent.getRandom(),
        accept: headersClone["accept"] || "application/json",
        "accept-encoding":
          headersClone["accept-encoding"] || "gzip, deflate, br",
        "accept-language":
          headersClone["accept-language"] ||
          "en,vi-VN;q=0.9,vi;q=0.8,en-US;q=0.7,ja;q=0.6",
      });

      await this.blockUnnessesaryRequest(page);

      return { page, browser, status: true };
    } catch (error) {
      console.log("openTab error" + error);
      return { status: false };
    }
  };

  catchScreenShot = async (page) => {
    console.log("catch ScreenShot");
    const savePath = path.resolve(
      `uploads/puppeteer/${moment().format("DDMMYYYY-HHmmss")}.png`
    );
    console.log("savePath", savePath);
    return await page.screenshot({
      path: savePath,
      fullPage: true,
    });
  };

  handleCatching = () => {
    try {
      let blockItem = ["modal-inform"];
    } catch (error) {}
  };

  search = async (req, res) => {
    let browser;
    try {
      const {
        page,
        browser: brows,
        status: isBrowserReady,
      } = await this.startBrowser(req);
      if (!page) throw new Error("page not found");
      if (!brows) throw new Error("browser not found");
      if (!isBrowserReady) throw { message: "Browser was error" };

      // await this.testPassConnection({ page });
      // return;
      await page.goto("https://masothue.com/");
      console.log("Tab https://masothue.com/ are ready to use");
      browser = brows;
      // return false;
      // await this.catchScreenShot(page);
      let query = req.body?.q?.toLowerCase();
      let selector = 'input[name="q"]';
      let actionSelector = 'button[type="submit"]';
      let mainContent = "#main";

      if (!query) throw { message: "Invalid query string" };
      console.log("waiting for Query");

      const listQuery = [
        "#main section .container table.table-taxinfo thead span",
        "#main section .container div.tax-listing div h3",
      ];

      await page.waitForSelector(selector);
      console.log("Founded Input");
      await page.$eval(selector, (el, v) => (el.value = v), query);
      await page.click(actionSelector);
      console.log("begin search modal-inform");
      await page.waitForNavigation();
      // await page.waitForSelector("#main .container");
      // this.catchScreenShot(page);
      await this.delay(2000);
      // this.catchScreenShot(page);
      let isModalShow = await page.evaluate((value) => {
        console.log("search Modal");
        let modal = document.querySelector("#modal-inform");
        if (modal && modal.style.display === "block") {
          return {
            status: true,
            message:
              modal.querySelector(".modal-body").innerHTML ||
              modal.querySelector(".modal-body").innerText,
          };
        }
        return { status: false, message: "Modal not found" };
      });
      console.log("isModalShow", isModalShow);
      if (isModalShow.status) {
        throw isModalShow;
      }

      await this.delay(2000);
      // this.catchScreenShot(page);
      await page.waitForSelector(mainContent, { timeout: 5000 });
      // console.log('begin search item')
      const data = await page.evaluate((v) => {
        let html = [];
        for (let i = 0; i < v.length; i++) {
          let itemQuery = v[i];
          let target = document.querySelector(itemQuery);
          if (target) {
            html.push(target?.textContent || target?.innerHTML);
            break;
          }
        }
        return html;
      }, listQuery);

      return {
        message: "Search company success",
        data,
      };
    } catch (error) {
      console.log("search error: " + JSON.stringify(error, null, 2));
      throw {
        message: error.toString(),
        data: error,
      };
    } finally {
      console.log("close browser ");
      await this.delay(5000);
      browser?.close();
    }
  };

  testPassConnection = async ({ page }) => {
    await page.goto("https://nowsecure.nl/");
    // Wait for security check
    await page.waitForTimeout(10000);

    await page.screenshot({ path: "image.png", fullPage: true });
  };

  blockUnnessesaryRequest = async (page) => {
    try {
      await page.setRequestInterception(true);
      page.on("request", async (request) => {
        const url = request.url();
        if (blocked_domains.some((domain) => url.includes(domain))) {
          await request.abort();
        } else if (request.resourceType() == "image") {
          await request.abort();
        } else {
          await request.continue();
        }
      });
    } catch (error) {
      console.log("blockUnnessesaryRequest error:", error);
    }
  };

  delay = (time) => {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  };
};
