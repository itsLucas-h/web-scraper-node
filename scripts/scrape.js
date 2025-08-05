import puppeteer from "puppeteer";

const scrape = async (maxPages = 10) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const allBooks = [];

  for (let i = 1; i <= maxPages; i++) {
    try {
      await page.goto(`https://books.toscrape.com/catalogue/page-${i}.html`, {
        waitUntil: "domcontentloaded",
      });

      const books = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".product_pod")).map((el) => ({
          title: el.querySelector("h3 a")?.getAttribute("title"),
          price: el.querySelector(".price_color")?.textContent,
          stock: el.querySelector(".instock.availability")?.innerText.trim(),
          rating: el.querySelector(".star-rating")?.className.split(" ")[1],
          link: new URL(
            el.querySelector("h3 a")?.getAttribute("href"),
            "https://books.toscrape.com/catalogue/"
          ).href,
        }))
      );

      for (const book of books) {
        try {
          await page.goto(book.link, { waitUntil: "domcontentloaded" });

          const details = await page.evaluate(() => ({
            description:
              document.querySelector("#product_description + p")?.innerText ||
              "N/A",
            upc:
              Array.from(document.querySelectorAll("table tr"))
                .find((row) => row.querySelector("th")?.innerText === "UPC")
                ?.querySelector("td")?.innerText || "N/A",
            category:
              document.querySelector(".breadcrumb li:nth-child(3) a")
                ?.innerText || "N/A",
          }));

          allBooks.push({ ...book, ...details });
        } catch (err) {
          console.error(`Book scrape error: ${err.message}`);
        }
      }
    } catch (err) {
      console.error(`Page ${i} error: ${err.message}`);
    }
  }

  await browser.close();
  return allBooks;
};

export default scrape;
