import { imagesList } from './products.data.js';
import { authFetch } from './auth.js';
import { ENV } from './config.js'

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

// 
// silde-show images 

let currentIndex = 0;
const imgElement = document.querySelector('.img-slideshow');
function changeImage() {
  currentIndex++;
  if (currentIndex >= imagesList.length) {
    currentIndex = 0
  }
  imgElement.src = imagesList[currentIndex];
  const indexItems = document.querySelectorAll('.index-item')
  indexItems.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add('active')
    }
    else {
      item.classList.remove('active')
    }
  });
}
setInterval(changeImage, 3000);

// click chuyeen tiep
const navigationLeftButton = () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = imagesList.length - 1;
  }
  imgElement.src = imagesList[currentIndex];
  const indexItems = document.querySelectorAll('.index-item')
  indexItems.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add('active')
    }
    else {
      item.classList.remove('active')
    }
  });

}
const navigationRightButton = () => {
  currentIndex++;
  if (currentIndex >= imagesList.length) {
    currentIndex = 0;
  }
  imgElement.src = imagesList[currentIndex];
  const indexItems = document.querySelectorAll('.index-item')
  indexItems.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add('active')
    }
    else {
      item.classList.remove('active')
    }
  });

}
const navigationLeft = document.querySelector('.navigation-left');
navigationLeft.addEventListener('click', navigationLeftButton)
const navigationRight = document.querySelector('.navigation-right');
navigationRight.addEventListener('click', navigationRightButton)


// hiển thị thêm sản phẩm 


const loadMoreBtn = document.querySelector('#load-more-btn');
const productMainShirt = document.querySelector('.product-shirt-main')




function renderProduct(container, products) {
  products.forEach(item => {

    if (!item.tags || !item.tags.includes('noi bat')) return;

    const divEl = document.createElement('div');
    divEl.classList.add('product-main');

    let saleHTML = '';
    if (item.tags.includes('sale 30%')) {
      saleHTML = `<div class="sale">sale 30%</div>`;
    } else if (item.tags.includes('sale 40%')) {
      saleHTML = `<div class="sale">sale 40%</div>`;
    }

    let priceHTML = `<p>${Number(item.price).toLocaleString('vi-VN')}đ</p>`;
    if (item.priceSale > 0 && item.priceSale < item.price) {
      priceHTML = `
        <p>${Number(item.priceSale).toLocaleString('vi-VN')}đ</p>
        <p class="sale-m">${Number(item.priceSale).toLocaleString('vi-VN')}đ</p>
      `;
    }

    const outSandHTML = `<img src="${ENV.API_URL}/uploads/${item.imageURL}" alt="${item.name}">`;

    divEl.innerHTML = `
      <div class="img_hidden">
        <a href="product-detail.html?id=${item.id}" class="img_box">
          ${outSandHTML}
          <div class="product_overlay"></div>
          ${saleHTML}
        </a>
      </div>
      <a href="product-detail.html?id=${item.id}" class="product_name">${item.name}</a>
      <div class="money_sale">
        ${priceHTML}
      </div>
    `;

    container.appendChild(divEl);
  });
}

let page = 1;
const limit = 3;


async function fetchProduct() {
  const res = await fetch(`${ENV.API_URL}/api/product?highlight=true&page=${page}&limit=${limit}`);
  const result = await res.json();

  const products = result.products;
  if (!Array.isArray(products)) return;

  renderProduct(productMainShirt, products);

  // nếu hết trang thì ẩn nút
  if (page >= result.totalPage) {
    loadMoreBtn.classList.add('hidden');
  }
}



loadMoreBtn.addEventListener("click", () => {
  page++;
  fetchProduct()
  // loadMoreBtn.classList.add('hidden')
});

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

const  loadCartQuantityIcon= async() => {
  const token = localStorage.getItem('accessToken');
  if (!token) return;

  const res = await fetch(`${ENV.API_URL}/api/cart`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  const list = data.data || data;

  const totalQuantity = list.reduce((sum, item) => sum + item.quantity, 0);
  updateCartQuantityIcon(totalQuantity);
}
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

// hết Token thi trang web sẽ tự đăng xuất 
async function loadCart() {
  const res = await authFetch(`${ENV.API_URL}/api/cart`);
  if (!res) return; // token hết hạn thì dừng

  const data = await res.json();
  // console.log(data); 
}
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





fetchProduct();
loadCartQuantityIcon()
loadCart() ;