const puppeteer = require("puppeteer");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  const url = "https://github.com/login";
  try {
    await page.goto(url);

    enterEmail(page);
    await delay(4000);
    enterPassword(page);

    await Promise.all([page.waitForNavigation()]);

    await page.screenshot({ path: "github.png" });
  } catch (error) {
    console.log(error);
  }
  await browser.close();
})();

const enterEmail = async (page) => {
  await page.waitForSelector("#login_field");
  await page.type("#login_field", process.env.GITHUB_USERNAME);
  await page.keyboard.press("Tab");
};
const enterPassword = async (page) => {
  await page.waitForSelector("#password");
  await page.type("#password", process.env.GITHUB_PASSWORD);
  await page.keyboard.press("Enter");
};

const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
