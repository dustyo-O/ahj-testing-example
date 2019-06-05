import puppetteer from 'puppeteer';

jest.setTimeout(10000); // default puppeteer timeout

describe('INN/OGRN form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false, // show gui
      //slowMo: 100,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should add .valid class for valid inn', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[data-widget=innogrn-form-widget]');
    const input = await form.$('[data-id=innogrn-input]');
    await input.type('7715964180');
    const submit = await form.$('[data-id=innogrn-submit]');
    submit.click();
    const props = await input.getProperties();

    await page.waitFor('[data-id=innogrn-input].valid');
  });

  test('should add .invalid class for valid inn', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[data-widget=innogrn-form-widget]');
    const input = await form.$('[data-id=innogrn-input]');
    await input.type('q715964180');
    const submit = await form.$('[data-id=innogrn-submit]');
    submit.click();
    const props = await input.getProperties();

    await page.waitFor('[data-id=innogrn-input].invalid');
  });

  test('should return .valid class for retyped valid inn', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[data-widget=innogrn-form-widget]');
    const input = await form.$('[data-id=innogrn-input]');
    await input.type('q715964180');
    const submit = await form.$('[data-id=innogrn-submit]');
    submit.click();
    const props = await input.getProperties();

    await page.waitFor('[data-id=innogrn-input].invalid');

    await page.evaluate(input => input.value = '', input);
    await input.type('1715964180');
    submit.click();
    await page.waitFor('[data-id=innogrn-input].valid');
    await page.waitFor('[data-id=innogrn-input].invalid', { hidden: true });
  });
});
