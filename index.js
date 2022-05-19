const puppeteer = require('puppeteer');

(async event => {
  const key_words = 'JavaScript';
  const link = 'https://www.google.com';

  const browser = await puppeteer.launch({ headless: false, slowMo: 100, devtools: true });

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 1199, height: 900 });

    await page.goto(link);

    await page.waitForSelector('div form div:nth-child(2) input');
    await page.click('div form div:nth-child(2) input');
    await page.keyboard.type(key_words);
    await page.keyboard.press('Enter');

    await page.waitFor(3000);

    await page.waitForSelector(
      '#main > div #center_col #search > div > div > div'
    );
    const url = await getHref(
      page,
      `#main > div #center_col #search > div > div > div a`
    );

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    await page.screenshot({
      fullPage: true,
      path: 'new_image.png'
    });
    const screenshotPath = process.cwd() + '/new_image.png';

    console.log('URL of the page:', url);
    console.log('Location of the screenshot:', screenshotPath);
    await page.waitFor(30000);
    await page.close();
    await browser.close();
  } catch (error) {
    console.log(error);
    await browser.close();
  }
})();

const getHref = (page, selector) =>
  page.evaluate(
    selector => document.querySelector(selector).getAttribute('href'),
    selector
  );




  // this code about how to connect extension with puppeteer

  const puppeteer = require('puppeteer');

(async () => {
  const pathToExtension = require('path').join(__dirname, 'my-extension');
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  });
  const targets = await browser.targets();
  const backgroundPageTarget = targets.find(target => target.type() === 'background_page');
  const backgroundPage = await backgroundPageTarget.page();
  // Test the background page as you would any other page.
  await browser.close();
})();
