const puppeteer = require('puppeteer');

(async event => {
  const email = ;
  const password = '';
  const wordForSearch = 'imported hakoomat na manzoor'
  const link = 'https://www.facebook.com/';

  const browser = await puppeteer.launch({ headless: false, slowMo: 100, devtools: true });

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 1199, height: 900 });

    await page.goto(link);

    // Facebook Login
    await page.waitForSelector('.inputtext')
    await page.click('.inputtext');
    await page.keyboard.type(email);
    await page.waitForSelector('#passContainer')
    await page.click('#passContainer');
    await page.keyboard.type(password);
    await page.keyboard.press('Enter');

    // wait for two verifications 
    await page.waitFor(60000);
    // search as per your requirement
    await page.waitForSelector('.mzan44vs')
    await page.click('.mzan44vs');
    await page.keyboard.type(wordForSearch);
    await page.keyboard.press('Enter');

    await page.waitFor(60000);
    
    await page.close();
    await browser.close();
  } catch (error) {
    console.log(error);
    await browser.close();
  }
})();
