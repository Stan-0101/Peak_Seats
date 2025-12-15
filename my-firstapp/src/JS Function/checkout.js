export default function checkoutFunction() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalEl = document.querySelector('.cart-total');
  const orderForm = document.getElementById('checkoutForm');

  if (!cartItemsContainer || !cartTotalEl || !orderForm) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalAmount = 0;

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    totalAmount = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalEl.textContent = '0';
      return;
    }

    cart.forEach(item => {
      totalAmount += item.price * item.qty;
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `<span>${item.name} x${item.qty}</span><span>₱${item.price * item.qty}</span>`;
      cartItemsContainer.appendChild(div);
    });

    cartTotalEl.textContent = totalAmount;
  }

  renderCart();

  function setupPaymentHandlers() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardFields = document.getElementById('cardFields');
    const onsiteInfo = document.getElementById('onsiteInfo');
    const cardInputs = cardFields?.querySelectorAll('input') || [];

    if (!cardFields || !onsiteInfo) {
      setTimeout(setupPaymentHandlers, 100);
      return;
    }

    paymentRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.value === 'card') {
          cardFields.style.display = 'block';
          onsiteInfo.style.display = 'none';
          cardInputs.forEach(input => input.required = true);
        } else {
          cardFields.style.display = 'none';
          onsiteInfo.style.display = 'block';
          cardInputs.forEach(input => input.required = false);
        }
      });
    });
  }

  setupPaymentHandlers();

  orderForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    const userNameInput = document.getElementById('customerName');
    const userName = userNameInput ? userNameInput.value : 'Guest';
    
    let cardHolderName = '';
    let cardNumber = '';
    let cardExpiry = '';
    let cardCvv = '';
    let cardLastFour = '';
    
    if (paymentMethod === 'card') {
      const cardHolderInput = document.querySelector('#cardFields input[placeholder="Cardholder Name"]');
      const cardNumberInput = document.querySelector('#cardFields input[placeholder="Card Number"]');
      const cardExpiryInput = document.querySelector('#cardFields input[placeholder="MM/YY"]');
      const cardCvvInput = document.querySelector('#cardFields input[placeholder="CVV"]');
      
      if (cardHolderInput && cardNumberInput && cardExpiryInput && cardCvvInput) {
        cardHolderName = cardHolderInput.value;
        cardNumber = cardNumberInput.value;
        cardExpiry = cardExpiryInput.value;
        cardCvv = cardCvvInput.value;
        cardLastFour = cardNumber.replace(/\s/g, '').slice(-4);
      }
    }

    const orderData = {
      userName: userName,
      mealItems: cart,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod === 'card' ? 'online_card' : 'onsite',
      cardHolderName: paymentMethod === 'card' ? cardHolderName : null,
      cardLastFour: paymentMethod === 'card' ? cardLastFour : null,
      cardExpiry: paymentMethod === 'card' ? cardExpiry : null,
      cardCvv: paymentMethod === 'card' ? cardCvv : null,
      restaurant: 'Multiple'
    };

    try {
      const response = await fetch('http://localhost/Peak_Seats/backend-peakseats/api/insertMeals.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Thank you for purchasing! Order ID: ' + result.orderId);
        localStorage.removeItem('cart');
        window.location.href = '/MealsPage';
      } else {
        alert('Failed to place order: ' + result.message);
      }
    } catch (error) {
      console.error(error);
      alert('Network error. Check console.');
    }
  });
}
