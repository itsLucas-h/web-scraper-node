# Book Scraper with Puppeteer

This project is a Node.js-based web scraper that extracts book data from [Books to Scrape](https://books.toscrape.com/), a demo site designed for practicing web scraping. The scraper uses [Puppeteer](https://pptr.dev/) to navigate the site and collect structured data including book titles, prices, availability, and star ratings across multiple pages.

## Features

- Scrapes book data from the first 10 catalogue pages
- Extracts:
  - Title
  - Price
  - Stock availability
  - Star rating
- Saves results to a `books.json` file
- Logs each page’s results to the console for verification

## Output Example

```json
[
  {
    "title": "A Light in the Attic",
    "price": "£51.77",
    "stock": "In Stock",
    "rating": "Three"
  },
  ...
]
```

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

## Usage

Run the scraper with:

```bash
node scrape.js
```

After execution, a file named `books.json` will be created in the root directory containing the extracted book data.

## How It Works

- The script uses Puppeteer to open a headless browser.
- It loops through the first 10 pages of the catalogue.
- On each page, it selects all book containers using the `.product_pod` class.
- From each book, it extracts:
  - The title from the `title` attribute
  - The price from `.price_color`
  - The stock status from `.instock.availability`
  - The rating from the `.star-rating` class
- The data is stored in an array and then saved to a JSON file.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

Lucas H.  
[GitHub Profile](https://github.com/itsLucas-h)

## Disclaimer

This scraper is intended for educational and demonstration purposes only. Always respect the terms of service and `robots.txt` of websites you scrape.
