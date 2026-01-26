// import { imagesList, products } from './products.data.js';
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
  closeInputFind.classList.add('hidden');
  closeInputFind.value = '';
});




// hiển thị thêm sản phẩm 


const loadMoreBtn = document.querySelector('#load-more-btn');
const productMainShirtPage = document.querySelector('.product-shirt-main-page')


let products = [];
// hien thij ta ca san pham 
function renderProduct(container, products) {
  products.forEach(item => {

    // if (!item.tags || !item.tags.includes('noi bat')) return;

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

    const outSandHTML = `<img src="http://localhost:3000/uploads/${item.imageURL}" alt="${item.name}">`;

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
let currentCategory = 'all';
let currentPrice = 'all'
let page = 1;
const limit = 4;


async function fetchProduct() {
  let url = `${ENV.API_URL}/api/product?page=${page}&limit=${limit}`;

  if (currentCategory !== 'all') {
    url += `&category=${currentCategory}`;
  }
  if (currentPrice !== 'all') {
    url += `&price=${currentPrice}`
  }

  const res = await fetch(url);
  const result = await res.json();

  renderProduct(productMainShirtPage, result.products);

  if (page >= result.totalPage) {
    loadMoreBtn.classList.add('hidden');
  } else {
    loadMoreBtn.classList.remove('hidden');
  }
}



loadMoreBtn.addEventListener("click", () => {
  page++;
  fetchProduct()
  // loadMoreBtn.classList.add('hidden')
});



const selectDrop = document.querySelector('#select-drop')
// clik change loc Danh muc 
selectDrop.addEventListener("change", async() => {
  currentCategory = selectDrop.value;
  page = 1 ;
  productMainShirtPage.innerHTML = '' ;
  fetchProduct()
});

// click loc gia san pham 

const priceFilter = document.getElementById('price-filter');
priceFilter.addEventListener('change',async () => {
  currentPrice = priceFilter.value;
  page = 1 ;
  productMainShirtPage.innerHTML = '' ;
  fetchProduct()

})


// 
const inputDrop = document.querySelector('.input-drop');

inputDrop.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const searchText = inputDrop.value.trim().toLowerCase();
    const inputNameDrop = products.filter(item =>
      item.name.toLowerCase().includes(searchText)
    );
    renderProductList(productMainShirtPage, inputNameDrop);
    loadMoreBtn.classList.add('hidden');
  }
});

// inputDrop.addEventListener('blur', () => {
//   inputDrop.value ='';
// });
//
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





// gia giam dan 

const priceGiam = document.querySelector('.price-giam');

priceGiam.addEventListener('click', () => {
  const priceGiamDan = [...products].sort((a, b) => {
    const priceA = a.priceSale || a.price;
    const priceB = b.priceSale || b.price;
    return priceB - priceA;
  });

  renderProductList(productMainShirtPage, priceGiamDan);
  loadMoreBtn.classList.add('hidden')
});

// gia tang dan 
const priceTang = document.querySelector('.price-tang');
priceTang.addEventListener('click', () => {
  const priceTangDan = [...products].sort((a, b) => {
    const priceA = a.priceSale || a.price;
    const priceB = b.priceSale || b.price;
    return priceA - priceB;
  })
  renderProductList(productMainShirtPage, priceTangDan);
  loadMoreBtn.classList.add('hidden')
})

//
// hien co bao nhieu san pham tren icon gio hang 
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

let cartItems = [];

if (currentUser) {
  cartItems = cart.filter(item => item.email === currentUser.email);
}

const quantityElement = document.querySelector('.update-content-cart');

if (currentUser && quantityElement) {
  const totalQuantity = cartItems.reduce((total, item) => total + Number(item.quantity), 0);

  if (totalQuantity > 0) {
    quantityElement.textContent = totalQuantity;
    quantityElement.classList.remove('hidden');
  } else {
    quantityElement.classList.add('hidden');
  }
} else {
  if (quantityElement) {
    quantityElement.classList.add('hidden');
  }
}

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

fetchProduct()