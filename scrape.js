import puppeteer from "puppeteer";

const scrape = async (maxPages = 10) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  const allBooks = [];
  let currentPage = 1;

  if (isNaN(maxPages) || maxPages < 1 || maxPages > 50) {
    throw new Error(
      "Invalid number of pages requested. Must be between 1 and 50."
    );
  }

  while (currentPage <= maxPages) {
    const url = `https://books.toscrape.com/catalogue/page-${currentPage}.html`;

    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });

      const booksOnPage = await page.evaluate(() => {
        const bookElements = document.querySelectorAll(".product_pod");
        return Array.from(bookElements).map((book) => {
          const title = book.querySelector("h3 a").getAttribute("title");
          const price = book.querySelector(".price_color").textContent;
          const stock = book
            .querySelector(".instock.availability")
            ?.innerText.trim();
          const rating = book
            .querySelector(".star-rating")
            ?.className.split(" ")[1];
          const relativeLink = book.querySelector("h3 a").getAttribute("href");
          const link = new URL(
            relativeLink,
            "https://books.toscrape.com/catalogue/"
          ).href;
          return { title, price, stock, rating, link };
        });
      });

      for (const book of booksOnPage) {
        try {
          await page.goto(book.link, { waitUntil: "domcontentloaded" });

          const details = await page.evaluate(() => {
            const description =
              document.querySelector("#product_description + p")?.innerText ||
              "N/A";
            const infoTable = document.querySelectorAll("table.table tr");
            let upc = "N/A";
            infoTable.forEach((row) => {
              const header = row.querySelector("th")?.innerText;
              if (header === "UPC") {
                upc = row.querySelector("td")?.innerText || "N/A";
              }
            });
            const category =
              document.querySelector(".breadcrumb li:nth-child(3) a")
                ?.innerText || "N/A";
            return { description, upc, category };
          });

          allBooks.push({ ...book, ...details });
        } catch (err) {
          console.error(
            `Failed to scrape book: ${book.title} — ${err.message}`
          );
        }
      }

      console.log(`Finished scraping page ${currentPage}`);
    } catch (err) {
      console.error(`Failed on page ${currentPage}: ${err.message}`);
    }

    currentPage++;
  }

  await browser.close();
  return allBooks;
};

export default scrape;
