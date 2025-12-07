import { useEffect } from "react";
import greenwich from '../images/greenwich.jpg';
import potatoCorner from '../images/potato-corner.jpg';
import taters from '../images/taters.jpg';
import jollibee from '../images/jollibee.jpg';
import mangInasal from '../images/mang-inasal.jpg';
import chowking from '../images/chowking.jpg';

export default function useAddToCart() {
  useEffect(() => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSummary = document.querySelector('.cart-summary');
    const mealSelect = document.getElementById('meal-select');
    const mealQty = document.getElementById('meal-qty');
    const addItemBtn = document.getElementById('add-item-btn');

    if (!cartItemsContainer || !cartSummary || !mealSelect || !mealQty || !addItemBtn) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    
        const mealImages = {
        'Greenwich': greenwich,
        'Potato Corner': potatoCorner,
        'Taters': taters,
        'Jollibee': jollibee,
        'Mang Inasal': mangInasal,
        'Chowking': chowking
        };

    function renderCart() {
      cartItemsContainer.innerHTML = '';
      if (cart.length === 0) {
        cartSummary.style.display = 'none';
        return;
      }
      cartSummary.style.display = 'block';
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        const imgSrc = mealImages[item.name] || '';
        cartItem.innerHTML = `
          <img src="${imgSrc}" alt="${item.name}">
          <div class="cart-details">
              <h3>${item.name}</h3>
              <p>₱<span class="item-price">${item.price}</span> x 
                  <span class="item-qty">${item.qty}</span>
                  <button class="qty-btn increase">+</button>
                  <button class="qty-btn decrease">−</button>
              </p>
          </div>
          <button class="remove-btn">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
      updateCartTotal();
    }

    function updateCartTotal() {
      let total = 0;
      cart.forEach(item => total += item.price * item.qty);
      document.querySelector('.cart-total').textContent = total;
    }

    cartItemsContainer.addEventListener('click', function (e) {
      const cartItemEl = e.target.closest('.cart-item');
      if (!cartItemEl) return;
      const name = cartItemEl.querySelector('h3').textContent;
      const itemIndex = cart.findIndex(item => item.name === name);
      if (itemIndex === -1) return;

      if (e.target.classList.contains('remove-btn')) {
        cart.splice(itemIndex, 1);
      }
      if (e.target.classList.contains('increase')) {
        cart[itemIndex].qty += 1;
      }
      if (e.target.classList.contains('decrease')) {
        if (cart[itemIndex].qty > 1) {
          cart[itemIndex].qty -= 1;
        } else {
          cart.splice(itemIndex, 1);
        }
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });

    addItemBtn.addEventListener('click', function () {
      const name = mealSelect.value;
      if (!name) return;
      const price = parseFloat(mealSelect.selectedOptions[0].dataset.price);
      const qty = parseInt(mealQty.value);
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.qty += qty;
      } else {
        cart.push({ name, price, qty });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      mealSelect.value = '';
      mealQty.value = 1;
    });

    renderCart();
  }, []);
}
