export default function Meals() {
  const addButtons = document.querySelectorAll(".food-card button");

  addButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = button.closest(".food-card");
      const name = card.querySelector("h3").textContent;
      const priceText = card.querySelector("p").textContent;

      // Extract price from text (e.g., ₱99 per order)
      const price = parseFloat(
        priceText.replace("₱", "").replace(/[^0-9.]/g, "")
      );

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find((item) => item.name === name);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "/CartPage";
    });
  });
}
