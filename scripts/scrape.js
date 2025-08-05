import puppeteer from "puppeteer";

const scrape = async (maxPages = 10) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const allBooks = [];

  for (let currentPage = 1; currentPage <= maxPages; currentPage++) {
    const url = `https://books.toscrape.com/catalogue/page-${currentPage}.html`;

    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });

      const books = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".product_pod")).map((book) => {
          const title = book.querySelector("h3 a")?.getAttribute("title");
          const price = book.querySelector(".price_color")?.textContent;
          const stock = book
            .querySelector(".instock.availability")
            ?.innerText.trim();
          const rating = book
            .querySelector(".star-rating")
            ?.className.split(" ")[1];
          const relativeLink = book.querySelector("h3 a")?.getAttribute("href");
          const link = new URL(
            relativeLink,
            "https://books.toscrape.com/catalogue/"
          ).href;
          return { title, price, stock, rating, link };
        })
      );

      for (const book of books) {
        try {
          await page.goto(book.link, { waitUntil: "domcontentloaded" });

          const details = await page.evaluate(() => {
            const description =
              document.querySelector("#product_description + p")?.innerText ||
              "N/A";
            const upc =
              Array.from(document.querySelectorAll("table.table tr"))
                .find((row) => row.querySelector("th")?.innerText === "UPC")
                ?.querySelector("td")?.innerText || "N/A";
            const category =
              document.querySelector(".breadcrumb li:nth-child(3) a")
                ?.innerText || "N/A";
            return { description, upc, category };
          });

          allBooks.push({ ...book, ...details });
        } catch {}
      }
    } catch {}
  }

  await browser.close();
  return allBooks;
};

export default scrape;
