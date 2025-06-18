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

