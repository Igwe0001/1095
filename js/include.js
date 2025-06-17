document.querySelectorAll("[include-html]").forEach((el) => {
  const file = el.getAttribute("include-html");
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error(`Error loading ${file}`);
      return response.text();
    })
    .then((data) => {
      el.innerHTML = data;
      el.removeAttribute("include-html");
      // Re-run includeHTML in case there are nested includes
      document.dispatchEvent(new Event("includes-loaded"));
    })
    .catch((err) => {
      el.innerHTML = "Include failed.";
      console.error(err);
    });
});

// Auto-rotate carousel every 5 seconds
document.addEventListener("DOMContentLoaded", function () {
  const myCarousel = new bootstrap.Carousel(
    document.getElementById("mainCarousel"),
    {
      interval: 3000,
      wrap: true,
      pause: "hover",
    }
  );
});


  // Get search term from URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('q');
  
  // Update page title
  if (searchTerm) {
      document.getElementById('search-title').textContent = `Search Results for "${searchTerm}"`;
  }

  // Sample content database (replace with your actual content)
  const contentDatabase = [
      {
          title: "How it Works",
          url: "how-it-works.html",
          keywords: ["how", "works", "process", "aca", "forms", "1095"],
          excerpt: "Our outsourcing services are designed to make your life easier. Read these simple steps to understand the process..."
      },
      {
          title: "TIN Matching",
          url: "tin-matching.html",
          keywords: ["tin", "verification", "tax", "irs"],
          excerpt: "Verify Tax ID numbers to ensure accurate reporting to the IRS..."
      },
      {
          title: "Web Presentment",
          url: "web-presentment.html",
          keywords: ["web", "presentment", "delivery", "electronic"],
          excerpt: "Electronic delivery options for your forms..."
      }
  ];

  // Display search results
  function showResults() {
      const resultsContainer = document.getElementById('search-results');
      
      if (!searchTerm) {
          resultsContainer.innerHTML = '<p>Please enter a search term</p>';
          return;
      }

      const searchTermLower = searchTerm.toLowerCase();
      const matches = contentDatabase.filter(item => 
          item.keywords.some(keyword => keyword.includes(searchTermLower)) ||
          item.title.toLowerCase().includes(searchTermLower)
      );

      if (matches.length === 0) {
          resultsContainer.innerHTML = `
              <div class="col-12">
                  <div class="alert alert-info">
                      No results found for "${searchTerm}". Try different keywords.
                  </div>
              </div>
          `;
          return;
      }

      resultsContainer.innerHTML = matches.map(item => `
          <div class="col-md-6 mb-4">
              <div class="service-card">
                  <div class="service-header">${item.title}</div>
                  <div class="service-body">
                      <p>${item.excerpt}</p>
                      <a href="${item.url}" class="read-more">Read More →</a>
                  </div>
              </div>
          </div>
      `).join('');
  }

  // Run the search when page loads
  showResults();