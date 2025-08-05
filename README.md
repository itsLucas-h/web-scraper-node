# Book Scraper with Puppeteer

This project is a Node.js-based web scraper and user interface that extracts book data from [Books to Scrape](https://books.toscrape.com/), a demo site designed for practising web scraping. It uses [Puppeteer](https://pptr.dev/) to automate data extraction and provides a browser-based UI to trigger scraping and download the results.

### Live Demo

Hosted on [Render](https://web-scraper-node-nqwx.onrender.com)

---

## Features

- Scrapes book data from up to 50 catalogue pages
- Extracted data includes:
  - Title
  - Price
  - Stock availability
  - Star rating
  - Product description
  - Category
  - Product UPC
- Interactive web interface:
  - Enter number of pages to scrape
  - Start scraping with a single click
  - Visual loading spinner during scraping
  - Download scraped data as `books.json`
- JSON output displayed in-browser

---

## Example Output

```json
[
  {
    "title": "A Light in the Attic",
    "price": "£51.77",
    "stock": "In stock",
    "rating": "Three",
    "link": "https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html",
    "description": "It's hard to imagine a world without A Light in the Attic...",
    "upc": "a897fe39b1053632",
    "category": "Poetry"
  }
]
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/itsLucas-h/web-scraper-node.git
   cd web-scraper-node
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node server.js
   ```

4. Open your browser:

   ```
   http://localhost:3000
   ```

---

## Project Structure

```
web-scraper-node/
├── data/               # Stores scraped data like books.json
├── public/             # Static frontend assets
│   ├── index.html      # Main UI
│   ├── main.js         # Scraper trigger and download logic
│   └── style.css       # Styling
├── scripts/
│   └── scrape.js       # Puppeteer scraper logic
├── server.js           # Express server and /scrape API endpoint
├── package.json        # Project metadata and dependencies
└── README.md
```

---

## How It Works

- `server.js` sets up an Express server and serves the frontend UI.
- When you click **"Run Scraper"**, it makes a request to `/scrape?pages=N`.
- `scripts/scrape.js` uses Puppeteer to scrape the specified number of pages.
- The result is returned to the browser and shown in a readable JSON format.
- The **Download JSON** button lets you save the results locally.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Lucas H.**  
[GitHub Profile](https://github.com/itsLucas-h)

---

## Disclaimer

This scraper is intended for educational and demonstration purposes only. Always respect the terms of service and `robots.txt` of websites you scrape.
