// Coffee prices
const coffeePrices = {
  espresso: 105,
  latte: 150,
  coldbrew: 175
};

const orderItemsContainer = document.getElementById("orderItems");
const addItemBtn = document.getElementById("addItem");
const totalDisplay = document.getElementById("total");
let itemCount = 1; // start with 1 item by default

// Function to update total price
function updateTotal() {
  let total = 0;
  const items = orderItemsContainer.querySelectorAll(".order-item");
  items.forEach(item => {
    const coffee = item.querySelector(".coffee").value;
    const quantity = parseInt(item.querySelector(".quantity").value) || 0;
    const price = coffeePrices[coffee] || 0;
    total += price * quantity;
  });
  totalDisplay.textContent = `₱${total.toFixed(2)}`;
}

// Function to prevent duplicate coffee selections
function preventDuplicates() {
  const selected = Array.from(orderItemsContainer.querySelectorAll(".coffee"))
    .map(select => select.value)
    .filter(v => v !== ""); // only valid choices

  orderItemsContainer.querySelectorAll(".coffee").forEach(select => {
    Array.from(select.options).forEach(option => {
      if (selected.includes(option.value) && option.value !== select.value) {
        option.disabled = true; // disable already chosen
      } else {
        option.disabled = false;
      }
    });
  });
}

// Add new coffee item row (limit 3, no duplicates)
addItemBtn.addEventListener("click", () => {
  if (itemCount >= 3) {
    alert("You can only order up to 3 different coffee selections.");
    return;
  }

  const newItem = document.createElement("div");
  newItem.classList.add("order-item");
  newItem.innerHTML = `
    <label>Choose Coffee:</label>
    <select class="coffee" required>
      <option value="">-- Select --</option>
      <option value="espresso">Classic Espresso - ₱105</option>
      <option value="latte">Vanilla Latte - ₱150</option>
      <option value="coldbrew">Cold Brew - ₱175</option>
    </select>

    <label>Quantity:</label>
    <input type="number" class="quantity" min="1" value="1" required>
    <button type="button" class="removeItem">Remove</button>
  `;
  orderItemsContainer.appendChild(newItem);

  itemCount++;

  // Update total and prevent duplicates when selections change
  newItem.querySelector(".coffee").addEventListener("change", () => {
    updateTotal();
    preventDuplicates();
  });
  newItem.querySelector(".quantity").addEventListener("input", updateTotal);

  // Remove item
  newItem.querySelector(".removeItem").addEventListener("click", () => {
    newItem.remove();
    itemCount--;
    updateTotal();
    preventDuplicates();
  });

  preventDuplicates();
  updateTotal();
});

// Attach listeners to first item
orderItemsContainer.querySelector(".coffee").addEventListener("change", () => {
  updateTotal();
  preventDuplicates();
});
orderItemsContainer.querySelector(".quantity").addEventListener("input", updateTotal);

// Initialize
updateTotal();
preventDuplicates();

/// Submit order
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let receipt = `<strong>Name:</strong> ${document.getElementById("name").value}<br><br>`;
  receipt += `<strong>Orders:</strong><br>`;

  const items = orderItemsContainer.querySelectorAll(".order-item");
  items.forEach(item => {
    const coffee = item.querySelector(".coffee");
    const coffeeName = coffee.options[coffee.selectedIndex].text;
    const quantity = item.querySelector(".quantity").value;
    const price = coffeePrices[coffee.value] * quantity;
    receipt += `- ${coffeeName} x ${quantity} = ₱${price.toFixed(2)}<br>`;
  });

  receipt += `<br><strong>Total:</strong> ${totalDisplay.textContent}`;

  // Show receipt in modal
  document.getElementById("receiptDetails").innerHTML = receipt;
  document.getElementById("receiptModal").style.display = "block";
});

// Close receipt modal
document.querySelector(".close-receipt").onclick = function() {
  document.getElementById("receiptModal").style.display = "none";
};
