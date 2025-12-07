export default function checkoutFunction() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalEl = document.querySelector('.cart-total');
  const orderForm = document.getElementById('checkoutForm');

  if (!cartItemsContainer || !cartTotalEl || !orderForm) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalEl.textContent = 0;
      return;
    }

    cart.forEach(item => {
      total += item.price * item.qty;
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `<span>${item.name} x${item.qty}</span><span>₱${item.price * item.qty}</span>`;
      cartItemsContainer.appendChild(div);
    });

    cartTotalEl.textContent = total;
  }

  renderCart();

  function setupPaymentHandlers() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardFields = document.getElementById('cardFields');
    const onsiteInfo = document.getElementById('onsiteInfo');
    const cardInputs = cardFields?.querySelectorAll('input') || [];

    // If elements don't exist, try again later (for React components)
    if (!cardFields || !onsiteInfo) {
      setTimeout(setupPaymentHandlers, 100);
      return;
    }

    paymentRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.value === 'card') {
          cardFields.classList.remove('hidden');
          onsiteInfo.classList.add('hidden');
          cardInputs.forEach(input => input.required = true);
        } else {
          cardFields.classList.add('hidden');
          onsiteInfo.classList.remove('hidden');
          cardInputs.forEach(input => input.required = false);
        }
      });
    });
  }

  // Initialize payment handlers
  setupPaymentHandlers();

  orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    alert('Thank you for purchasing!');
    localStorage.removeItem('cart');
    window.location.href = '/MealsPage';
  });
}