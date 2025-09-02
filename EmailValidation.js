  const form = document.getElementById("subscribeForm");
  const emailInput = document.getElementById("email");
  const errorMessage = document.getElementById("error-message");

  emailInput.addEventListener("input", () => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailInput.value === "" || pattern.test(emailInput.value)) {
      errorMessage.style.display = "none";
      emailInput.style.borderColor = "";
    } else {
      errorMessage.style.display = "block";
      emailInput.style.borderColor = "red";
    }
  });

  form.addEventListener("submit", (e) => {
    if (!emailInput.checkValidity()) {
      e.preventDefault();
      errorMessage.style.display = "block";
      emailInput.style.borderColor = "red";
    }
  });