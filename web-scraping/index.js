const puppeteer = require("puppeteer");
const { Parser } = require("json2csv");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = "https://www.okdam.com/category/books";
  try {
    await page.goto(url);

    const results = await page.$$eval(".product-inner", (data) => {
      return [...data].map((d) => {
        return {
          title: d.querySelector(".product_name").innerText.trim(),
          rating: d.querySelector("span.rating-count").innerText.trim(),
          price: d.querySelector("span.og-price").innerText.trim(),
        };
      });
    });

    const parser = new Parser();
    const csv = parser.parse(results);

    fs.writeFileSync("./data.csv", csv);
  } catch (error) {
    console.log(error);
  }
  await browser.close();
})();
