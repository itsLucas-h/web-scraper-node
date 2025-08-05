import puppeteer from "puppeteer";

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = "https://books.toscrape.com/";

  await page.goto(url);

  const books = await page.evaluate(() => {
    const bookElements = document.querySelectorAll(".product_pod");
    return bookElements;
  });

  console.log(books);

  await browser.close();
};

scrape();
