
document.addEventListener("DOMContentLoaded", function() {
  const products = document.querySelectorAll(".product");
  const modal = document.getElementById("orderModal");
  const closeBtn = document.querySelector(".close");
  const coffeeSelect = document.querySelector("#orderItems .coffee");

  // Prices map
  const coffeePrices = {
    espresso: 105,
    latte: 150,
    coldbrew: 175
  };

  // Open modal when product is clicked
  products.forEach(product => {
    product.addEventListener("click", () => {
      const coffeeType = product.getAttribute("data-coffee");

      // Open modal
      modal.style.display = "flex";

      // Preselect coffee in dropdown
      coffeeSelect.value = coffeeType;

      // Reset quantity
      document.querySelector("#orderItems .quantity").value = 1;

      // Update total
      updateTotal();
    });
  });

  // Close modal
  closeBtn.onclick = () => modal.style.display = "none";
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  // Update total when quantity or coffee changes
  document.getElementById("orderForm").addEventListener("input", updateTotal);

  function updateTotal() {
    let total = 0;
    document.querySelectorAll("#orderItems .order-item").forEach(item => {
      const coffee = item.querySelector(".coffee").value;
      const qty = parseInt(item.querySelector(".quantity").value) || 0;
      if (coffee && coffeePrices[coffee]) {
        total += coffeePrices[coffee] * qty;
      }
    });
    document.getElementById("total").textContent = "₱" + total.toFixed(2);
  }
});

