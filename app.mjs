import puppeteer from 'puppeteer';
import 'dotenv/config';

const githubEmail = process.env.GITHUB_EMAIL;
const githubPassword = process.env.GITHUB_PASSWORD;

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Define como "true" para executar em segundo plano (sem interface gráfica)
  });
  const page = await browser.newPage();

  await page.goto('https://github.com/login');

  await page.type('#login_field', githubEmail, { delay: 100 });
  await page.type('#password', githubPassword, { delay: 100 });

  await page.click('input[type="submit"]');

  await page.waitForNavigation();

  await page.goto('https://github.com/cortoppassi');

  await page.waitForTimeout(2000);

  const userName = await page.evaluate(() => {
    const usernameElement = document.querySelector('.vcard-username');
    return usernameElement ? usernameElement.textContent.trim() : null;
  });

  const userBio = await page.evaluate(() => {
    const bioElement = document.querySelector('.user-profile-bio');
    return bioElement ? bioElement.textContent.trim() : null;
  });

  console.log(`Nome de Usuário: ${userName}`);
  console.log(`Bio: ${userBio}`);

  // await browser.close();
})();
