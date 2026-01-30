  import { imagesList, products } from './products.data.js';
  import { ENV } from './config.js';
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
let currentCart = []
let totalAll = 0;
  async function loadCartCheckout() {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${ENV.API_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

     currentCart = await res.json(); // API trả về mảng cartItem

    const divInformation = document.querySelector('.div-information');
    divInformation.innerHTML = "";

     totalAll = 0;

    currentCart.forEach(item => {
      const product = item.product;
      const subTotal = item.quantity * product.price;
      totalAll += subTotal;

      const divCartCheckout = document.createElement('div');
      divCartCheckout.classList.add('cart-checkout-page');
      divCartCheckout.innerHTML = `
        <div class="cart-page-check">
          <img class="img-cart-checkout" src="${ENV.API_URL}/uploads/${product.imageURL}" alt="">
          <div class="content-checkout">
            <div class="content-size-quantity">
              <p class="checkout-size">Size: ${item.sizeSelected}</p>
              <p class="checkout-quantity">Số lượng: ${item.quantity}</p>
            </div>
            <p class="checkout-name">${product.name}</p>
          </div>
        </div>
      `;
      divInformation.appendChild(divCartCheckout);
    });

    const divTotalCheckout = document.createElement('div');
    divTotalCheckout.classList.add('total-checkout-content');
    divTotalCheckout.innerHTML = `
      <p class="total-checkout">Tổng tiền: ${totalAll.toLocaleString('vi-VN')} đ</p>
    `;
    divInformation.appendChild(divTotalCheckout);
  }




  /// xác nhập đơn hàng 
  const inputName = document.querySelector('#input-name');
  const inputAddress = document.querySelector('#input-address');
  const inputEmail = document.querySelector('#input-email');
  const inputPhone = document.querySelector('#input-phone');

  const buttonSubmit = document.querySelector('.button-submit');
  // const totalCheckout = document.querySelector('.total-checkout');

buttonSubmit.addEventListener('click', async (event) => {
  event.preventDefault();

  const receiverName = inputName.value.trim();
  const shippingAddress = inputAddress.value.trim();
  const email = inputEmail.value.trim();
  const phone = inputPhone.value.trim();
  const orderStatus = 'Đang chờ xử lý';
  const token = localStorage.getItem('accessToken');

  if (!receiverName || !shippingAddress || !email || !phone) {
    alert('Không được bỏ trống');
    return;
  }

  if (phone.length < 10) {
    alert('Số điện thoại không hợp lệ');
    return;
  }

  if (currentCart.length === 0) {
    alert('Giỏ hàng trống');
    return;
  }

  try {
    const resOrder = await fetch(`${ENV.API_URL}/api/historyOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        totalPrice: totalAll,
        receiverName,
        phone,
        email,
        shippingAddress,
        orderStatus
      })
    });

    if (!resOrder.ok) throw new Error('Tạo đơn hàng thất bại');

    const dataOrder = await resOrder.json();
    const orderId = dataOrder.orderId; 

   
    const orderItemPromises = currentCart.map(item => {
      const product = item.product;
      const priceAtPurchase =
        product.priceSale && product.priceSale > 0
          ? product.priceSale
          : product.price;

      return fetch(`${ENV.API_URL}/api/orderItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId,
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase,
          sizeSelected: item.sizeSelected
        })
      });
    });

    await Promise.all(orderItemPromises);

    alert('Đặt hàng thành công!');
    window.location.href = 'order_confirmation.html';

  } catch (error) {
    console.error(error);
    alert('Có lỗi xảy ra khi đặt hàng');
  }
});


  ///
// dang xuat 
const spanLogOut = document.querySelector('.log-out');

spanLogOut.addEventListener('click', () => {
  const result = confirm("Bạn chắc chắn muốn đăng xuất không");
  if (result) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentToken');
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

  loadCartCheckout();