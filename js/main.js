const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#close-cart');
cartIcon.onclick = () => {
  cart.classList.add('active');
};
closeCart.onclick = () => {
  cart.classList.remove('active');
};
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}
function ready() {
  const removeCartButtons = document.getElementsByClassName('cart-remove');
  for (let i = 0; i < removeCartButtons.length; i++) {
    const button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }
  const quantityInputs = document.getElementsByClassName('cart-quantity');
  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
  const addCart = document.getElementsByClassName('add-cart');
  for (let i = 0; i < addCart.length; i++) {
    const button = addCart[i];
    button.addEventListener('click', addCartClicked);
  }
  document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener('click', buyButtonClicked);
}
function buyButtonClicked() {
  alert('Your Order is Placed Thanks For Shopping');
  const cartContent = document.getElementsByClassName('cart-content')[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}
function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}
function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}
function addCartClicked(event) {
  const button = event.target;
  const shopProducts = button.parentElement;
  const title =
    shopProducts.getElementsByClassName('product-title')[0].innerText;
  const price = shopProducts.getElementsByClassName('price')[0].innerText;
  const productImg = shopProducts.getElementsByClassName('product-img')[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}
function addProductToCart(title, price, productImg) {
  // Create cart item container
  const cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  const cartItems = document.getElementsByClassName('cart-content')[0];
  const cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert('This Item is Already Added You can Add the Quantity');
      return;
    }
  }
  const cartBoxContent = `<img src=${productImg} alt="" class="cart-img">
                    <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                    <div class="cart-price">${price}</div>
                   <input type="number" value="1" class="cart-quantity">
                </div> 
                   <i class='bx bx-trash-alt cart-remove'></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem);
  cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged);

  updatetotal();
}
updatetotal();
function updatetotal() {
  const cartContent = document.getElementsByClassName('cart-content')[0];
  const cartBoxes = document.getElementsByClassName('cart-box');
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    const priceElement = cartBox.getElementsByClassName('cart-price')[0];
    const quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    const price = parseFloat(priceElement.innerText.replace('$', ' '));
    const quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}
