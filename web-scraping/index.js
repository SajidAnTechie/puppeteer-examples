const puppeteer = require("puppeteer");
const { Parser } = require("json2csv");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto("https://www.okdam.com/category/books");

    const result = await page.$$eval(".product_name", (data) => {
      return [...data].map((d) => {
        return {
          bookName: d.innerText,
        };
      });
    });

    const parser = new Parser();
    const csv = parser.parse(result);

    fs.writeFileSync("./data.csv", csv);
  } catch (error) {
    console.log(error);
  }
  await browser.close();
})();
