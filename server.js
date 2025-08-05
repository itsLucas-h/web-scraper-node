import express from "express";
import scrape from "./scrape.js";

const app = express();

app.use(express.static("public"));

app.get("/scrape", async (req, res) => {
  try {
    const pages = parseInt(req.query.pages);
    const pageCount = isNaN(pages) || pages < 1 || pages > 50 ? 10 : pages;

    const data = await scrape(pageCount);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (error) {
    console.error("Scraper error:", error.message);
    res.status(500).json({ error: "Scraping failed: " + error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
