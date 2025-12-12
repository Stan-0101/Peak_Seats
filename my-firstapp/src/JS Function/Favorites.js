export default function initFavorites() {
  const favorites = [];

  document.querySelectorAll('.item').forEach(item => {
    let heart = item.querySelector('.heart');
    if (!heart) {
      heart = document.createElement('div');
      heart.classList.add('heart');
      heart.textContent = '♡';
      item.appendChild(heart);
    } else {
      heart.textContent = '♡';
    }
  });

  document.querySelectorAll('.heart').forEach(heart => {
    heart.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = heart.parentElement;
      heart.classList.toggle('active');
      heart.textContent = heart.classList.contains('active') ? '❤️' : '♡';

      if (heart.classList.contains('active')) {
        if (!favorites.includes(item.id)) {
          favorites.push(item.id);
        }
      } else {
        const index = favorites.indexOf(item.id);
        if (index > -1) {
          favorites.splice(index, 1);
        }
      }

      console.log('Favorites:', favorites);
    });
  });

  const searchIcon = document.querySelector('.search-icon');
  if (!searchIcon) return;

  let searchBar = document.querySelector('.search-bar');
  if (!searchBar) {
    searchBar = document.createElement('div');
    searchBar.classList.add('search-bar');
    searchBar.innerHTML = `
      <input type="text" placeholder="Search favorites..." class="search-input">
    `;
    searchBar.style.display = 'none';
    document.querySelector('.header').appendChild(searchBar);
  }

  searchIcon.addEventListener('click', () => {
    searchBar.style.display =
      searchBar.style.display === 'none' ? 'block' : 'none';
  });

  const searchInput = searchBar.querySelector('.search-input');
  searchInput.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.item').forEach(item => {
      const text = item.querySelector('.item-text h4').textContent.toLowerCase();
      item.style.display = text.includes(query) ? 'flex' : 'none';
    });
  });
}
