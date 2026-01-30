


import { ENV } from './config.js';
import { imagesList, products } from './products.data.js';

//
const openPopup = document.querySelector(".open-popup");
const navigationPopup = document.querySelector(".navigation-popup");
const closePopup = document.querySelector(".delete-navigation");
const imgBannerPopup = document.querySelector(".img-banner-overlod-navigation");
//
const navigationSit = document.querySelector(".navigation-sit");
const menuSub = document.querySelector(".menu-sub1");
const navigationUp = document.querySelector(".navigation-up");
//nút input tìm kiếm
const openInput = document.querySelector(".open-input");
const openInputFind = document.querySelector(".input-find");

openPopup.addEventListener("click", () => {
  navigationPopup.classList.add("navigation-popup--open");
});

closePopup.addEventListener("click", () => {
  navigationPopup.classList.remove("navigation-popup--open");
});
imgBannerPopup.addEventListener("click", () => {
  navigationPopup.classList.remove("navigation-popup--open");
});

//
navigationSit.addEventListener("click", () => {
  menuSub.classList.add("menu-sub1--open");
  navigationSit.classList.add("hidden");
  navigationUp.classList.remove("hidden");
});

// })
navigationUp.addEventListener("click", () => {
  menuSub.classList.remove("menu-sub1--open");
  navigationUp.classList.add("hidden");
  navigationSit.classList.remove("hidden");
});
//
openInput.addEventListener("click", () => {
  openInputFind.classList.remove("hidden");
});
const closeInputFind = document.querySelector('.input-find');

closeInputFind.addEventListener('blur', () => {
  closeInputFind.classList.add('hidden')
});
// tim kiem san pham 
// dăng nhap trước kho vô trang giỏ hàng 
const currentUser = localStorage.getItem('currentUser');
const pareUser = JSON.parse(currentUser)
if (!pareUser) {
  alert('Bạn phải đăng nhập trước khi vô trang giỏ hàng')
  window.location.href = 'login.html'
  // return;
}
/// them san pham vao gio hang
const getCartApi = async () => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${ENV.API_URL}/api/cart`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await res.json();
};
const updateCartApi = async (data) => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${ENV.API_URL}/api/cart`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return await res.json();
}
const deleteCartApi = async (data) => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${ENV.API_URL}/api/cart`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return await res.json();
};
const sectionCartRow = document.querySelector('.cart-row');
const initCartPage = async () => {
  const cartItems = await getCartApi();
  const list = cartItems.data || cartItems;
  sectionCartRow.innerHTML = "";

  if (!list || list.length === 0) {
    sectionCartRow.innerHTML = `<p class="cart-dang-trong"> Giỏ hàng đang trống  </p>`;
    return;
  }
  renderCartUI(list);

}

const renderCartUI = (cartItem) => {
  let totalAll = 0;
  let totalQuantity = 0;
  const divELCarPage = document.createElement('div')
  divELCarPage.classList.add('cart-page-layout');
  divELCarPage.innerHTML = `
                <div class="cart-page_head">
                    <h1>Giỏ hàng của bạn</h1>
                    <p>Hiện đang có ${cartItem.length} sản phẩm</p>
                </div>
                <div class="cartformpage">
                    <div class="head-cart">
                        <div class="content-item">
                            <span>Sản phẩm</span>
                        </div>
                        <div class="quantity-item">
                            <span>Số lượng</span>
                        </div>
                        <div class="price-item">
                            <span class="span-price-cart">Số Tiền</span>
                        </div>
                    </div> 
                    <div class="content-cart">
                    </div>
  `
  sectionCartRow.appendChild(divELCarPage);

  const divContentCart = document.querySelector('.content-cart')
  cartItem.forEach(item => {
    const product = item.product;
    const subTotal = item.quantity * product.price;
    totalAll += subTotal;
    totalQuantity += item.quantity;
    const divEl = document.createElement('div');
    divEl.innerHTML = `
        <div class="content-cart-page" data-id="${item.productId}" data-size="${item.sizeSelected}">
            <div class="content-item img-cart">
               <img src="${ENV.API_URL}/uploads/${product.imageURL}" alt="">
                <div class="content-cart-product">
                    <p>Mã: ${item.productId}, Size: ${item.sizeSelected}</p>
                    <h1>${product.name}</h1>
                    <button class="button-cart-remove">Remove</button>
                </div>
            </div>
            <div class="quantity-item">
                <span class="span-detail minus">-</span>  
                <input type="number" class="quantity-cart" value="${item.quantity}" readonly>
                <span class="span-detail plus">+</span>
            </div>
            <div class="price-item">
                <span>${subTotal.toLocaleString('vi-VN')} đ</span>
            </div>
        </div>`;
    divContentCart.appendChild(divEl);
  })
  const divTotal = document.createElement('div');
  divTotal.classList.add('total-cart');
  divTotal.innerHTML = `
      <span>Tổng tiền :</span>
      <p class="total-price">${totalAll.toLocaleString('vi-VN')} đ</p>
  `;
  divELCarPage.appendChild(divTotal);

  // Checkout
  const divCheckOut = document.createElement('div');
  divCheckOut.classList.add('checkout-cart');
  divCheckOut.innerHTML = `
      <p class="price-shop-continue">Tiếp tục mua sắm</p>
      <button class="button-checkout-cart">Thanh toán sản phẩm</button>
  `;
  divELCarPage.appendChild(divCheckOut);
  const btnCheckout = divCheckOut.querySelector('.button-checkout-cart');
  btnCheckout.addEventListener('click', () => {
    window.location.href = 'checkout.html'; // trang thanh toán của bạn
  });
  const shopPriceContinue = document.querySelector('.price-shop-continue');
  shopPriceContinue.addEventListener('click', () => {
    window.location.href = `products.html`
  })
  updateCartQuantityIcon(totalQuantity);


}

sectionCartRow.addEventListener('click', async (event) => {
  const target = event.target;
  const row = target.closest('.content-cart-page');
  if (!row) return;
  const productId = row.dataset.id;
  const sizeSelected = row.dataset.size;
  const quantityInput = row.querySelector('.quantity-cart');
  let currentQuantity = parseInt(quantityInput.value);
  if (target.classList.contains('plus')) {
    const res = await updateCartApi({
      productId,
      sizeSelected,
      quantity: currentQuantity + 1
    })
    if (res) initCartPage();
  }
  if (target.classList.contains('minus')) {
    if (currentQuantity > 1) {
      const res = await updateCartApi({
        productId,
        sizeSelected,
        quantity: currentQuantity - 1
      })
      if (res) initCartPage()
    }
  }
  if (target.classList.contains('button-cart-remove')) {
    if (confirm('Bạn chắc chắn muốn xoá sản phẩm này')) {
      const res = await deleteCartApi({
        productId,
        sizeSelected
      })
      if (res) initCartPage()
    }
  }
})
function updateCartQuantityIcon(total) {
  const quantityElement = document.querySelector('.update-content-cart');
  if (!quantityElement) return;

  quantityElement.textContent = total;
  if (total > 0) {
    quantityElement.classList.remove('hidden');
  } else {
    quantityElement.classList.add('hidden');
  }
}

// dang xuat 
const spanLogOut = document.querySelector('.log-out');

spanLogOut.addEventListener('click', () => {
  const result = confirm("Bạn chắc chắn muốn đăng xuất không");
  if (result) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  }
});
// chuyen account
const buttonMyAccount = document.querySelector('.btn-my-account');
buttonMyAccount.addEventListener('click', () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    window.location.href = 'my-account.html'
  }
  else {
    window.location.href = 'register.html'
  }
})

const inputFind = document.querySelector('.input-find');
inputFind.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const searchText = inputFind.value.trim().toLowerCase();
    if (searchText !== '') {
      localStorage.setItem('searchKey', searchText); // lưu từ khóa
      window.location.href = 'find_product.html';      // chuyển trang
    }
  }
});

initCartPage();