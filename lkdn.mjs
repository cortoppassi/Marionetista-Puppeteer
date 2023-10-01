import puppeteer from 'puppeteer';
import 'dotenv/config';

const linkedinEmail = process.env.GITHUB_EMAIL;
const linkedinPassword = process.env.GITHUB_PASSWORD;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto('https://www.linkedin.com/');
  await page.waitForSelector('#session_key');
  await page.type('#session_key', linkedinEmail, { delay: 100 });
  await page.waitForSelector('#session_password');
  await page.type('#session_password', linkedinPassword, { delay: 100 });
  await page.click('button[data-id="sign-in-form__submit-btn"]');
  await page.waitForSelector('#ember26');
  await page.click('#ember26');


  const yourFrase = "Já faz algum tempo que estou usando o Puppeteer, e devo dizer que é uma ferramenta incrível! Com ele, posso controlar navegadores, manipular o DOM, fazer requisições, capturar telas, gerar PDFs e muito mais, tudo com a flexibilidade e poder do JavaScript. O Puppeteer se destaca como uma escolha sólida para automação web, oferecendo uma solução eficaz e versátil. Embora muitos desenvolvedores optem pelo Python, especialmente devido à biblioteca completa chamada Scrapy, o Puppeteer prova que o JavaScript é uma escolha poderosa para automatizar tarefas na web.";
  const delayBetweenKeystrokes = 50;

  await page.waitForSelector('div[data-placeholder="No que você está pensando?"]');
  await page.focus('div[data-placeholder="No que você está pensando?"]');

  for (const char of yourFrase) {
    await page.keyboard.type(char, { delay: delayBetweenKeystrokes });
  }
})();
