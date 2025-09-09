const modal = document.getElementById("orderModal");
const btn = document.getElementById("shopNowBtn");
const closeBtn = document.querySelector(".close");

// Open modal when clicking button
btn.onclick = () => modal.style.display = "flex";

// Close modal when clicking X
closeBtn.onclick = () => modal.style.display = "none";

// Close modal when clicking outside
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
