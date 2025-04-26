document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const categories = {
    apps: document.getElementById("apps-category"),
    games: document.getElementById("games-category"),
  };

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Hide all categories
      Object.values(categories).forEach((category) => {
        category.style.display = "none";
      });

      // Show selected category
      const selectedCategory = button.dataset.category;
      categories[selectedCategory].style.display = "grid";
    });
  });
});
