import { ENV } from './config.js';

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
async function fetchMyOrders() {
  const token = localStorage.getItem("accessToken");

  const orderId = localStorage.getItem("orderId");

  const res = await fetch(`${ENV.API_URL}/api/historyOrder/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Không lấy được đơn hàng");

  return await res.json();
}


const sectionOrder = document.querySelector(".section-order");

async function renderOrders() {
  try {
    const order = await fetchMyOrders();

    // sectionOrder.innerHTML = "";

    order.orderItems.forEach(item => {
      const divEl = document.createElement("div");
      divEl.classList.add("div-order-page");

      const product = item.product;
      const price = Number(item.priceAtPurchase || 0);
      const totalPrice = Number(item.quantity || 0) * price;

      divEl.innerHTML = `
        <div class="div-confirmation-img">
          <img src="${ENV.API_URL}/uploads/${product.imageURL}" alt="">
          <h2>${product.name}</h2>
        </div>
        <div class="div-confirmation-quantity">
          <span>x ${item.quantity}</span>
        </div>
        <div class="div-confirmation-price">
          <span>${totalPrice.toLocaleString("vi-VN")} đ</span>
        </div>
      `;

      sectionOrder.appendChild(divEl);
    });

    const divTotalPrice = document.createElement("div");
    divTotalPrice.classList.add("total-price");
    divTotalPrice.innerHTML = `
      <span>Tổng tiền thanh toán : ${Number(order.totalPrice).toLocaleString("vi-VN")} đ</span>
    `;
    sectionOrder.appendChild(divTotalPrice);

  } catch (err) {
    console.log(err);
    sectionOrder.innerHTML = `<p>Lỗi load đơn hàng</p>`;
  }
}





/// tiep tuc 
const continueButton = document.querySelector('.continue-cart');
continueButton.addEventListener('click' ,() => {
  window.location.href = 'index.html'
})
// history 
const historyButton = document.querySelector('.history-cart');
historyButton.addEventListener('click' ,() => {
  window.location.href = 'my-account.html'
})
window.addEventListener('beforeunload', function () {
  localStorage.removeItem('checkoutForm'); 
});

// dang xuat 
const spanLogOut = document.querySelector('.log-out');

spanLogOut.addEventListener('click', () => {
  const result = confirm("Bạn chắc chắn muốn đăng xuất không");
  if (result) {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  }
});
// chuyen account
const buttonMyAccount = document.querySelector('.btn-my-account');
buttonMyAccount.addEventListener('click' ,() => {
  if(currentUserParse) {
    window.location.href ='my-account.html'
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

renderOrders();