let scrapedData = [];

async function runScraper() {
  const status = document.getElementById("status");
  const output = document.getElementById("output");
  const spinner = document.getElementById("spinner");
  const downloadBtn = document.getElementById("downloadBtn");
  const pages = document.getElementById("pages").value;

  status.textContent = "Fetching book data...";
  output.textContent = "";
  spinner.classList.remove("hidden");
  downloadBtn.classList.add("hidden");
  scrapedData = [];

  try {
    const res = await fetch(`/scrape?pages=${pages}`);
    const text = await res.text();

    try {
      const data = JSON.parse(text);
      scrapedData = data;
      status.textContent = `Scraped ${data.length} books from ${pages} page${
        pages > 1 ? "s" : ""
      }.`;
      output.textContent = JSON.stringify(data, null, 2);
      downloadBtn.classList.remove("hidden");
    } catch {
      status.textContent = "Response is not valid JSON.";
      output.textContent = text;
    }
  } catch (err) {
    status.textContent = "Failed to fetch data.";
    output.textContent = err.toString();
  } finally {
    spinner.classList.add("hidden");
  }
}

function downloadJSON() {
  const blob = new Blob([JSON.stringify(scrapedData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "books.json";
  a.click();
  URL.revokeObjectURL(url);
}
