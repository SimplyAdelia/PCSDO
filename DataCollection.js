
document.getElementById('orderForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  const itemElements = document.querySelectorAll('.order-item');
  let ordersText = '';
  let total = 0;

  itemElements.forEach(item => {
    const coffee = item.querySelector('.coffee').value;
    const quantity = parseInt(item.querySelector('.quantity').value);
    if (coffee && quantity > 0) {
      let coffeeName = '';
      let price = 0;
      switch (coffee) {
        case 'espresso':
          coffeeName = 'Classic Espresso';
          price = 105;
          break;
        case 'latte':
          coffeeName = 'Vanilla Latte';
          price = 150;
          break;
        case 'coldbrew':
          coffeeName = 'Cold Brew';
          price = 175;
          break;
      }
      total += price * quantity;
      ordersText += `${coffeeName} x${quantity}, `;
    }
  });

  ordersText = ordersText.replace(/,\s*$/, ''); // Clean trailing comma

  const scriptURL = "https://script.google.com/macros/s/AKfycbzWihLOEHi0s1R5sDZonydxmRfdJy1oBjgFz4-ZW7q0IYbbfnbR6-0USGgMDAMznPve/exec";

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("orders", ordersText);
  formData.append("total", `₱${total.toFixed(2)}`);

  fetch(scriptURL, {
    method: "POST",
    body: formData,
  }).then(response => {
    alert("Order submitted! We'll contact you shortly.");
    document.getElementById('orderForm').reset();
    document.getElementById('total').textContent = "₱0.00";
  }).catch(error => {
    console.error("Error!", error.message);
    alert("There was an issue submitting your order.");
  });
});
