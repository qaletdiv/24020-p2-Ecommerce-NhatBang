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
  closeInputFind.classList.add('hidden')
});



// lam click tang them san pham


// lay nhung san pham tuong tu va khong lay san pham da vo trang chi tiet 
//
// so san pham se duoc suat hien vd nhu 3 san pham 

const productShirtSame = document.querySelector('.product-shirt-main-same')
const loadMoreBtn = document.querySelector('#load-more-btn');

function renderProduct(container, products, isAppend = false) {
  if (!isAppend) {
    container.innerHTML = "";
  }
  products.forEach(item => {

    // if (!item.tags || !item.tags.includes('noi bat')) return;

    const divEl = document.createElement('div');
    divEl.classList.add('product-main');

    let saleHTML = '';
    const saleTag = item.tags.find(tag => tag.includes('sale'));
    if (saleTag) {
      saleHTML = `<div class="sale">${saleTag}</div>`;
    }

    let priceHTML = `<p>${item.price.toLocaleString('vi-VN')}đ</p>`;
    if (item.priceSale > 0 && item.priceSale < item.price) {
      priceHTML = `
        <p>${item.priceSale.toLocaleString('vi-VN')}đ</p>
        <p class="sale-m">${item.price.toLocaleString('vi-VN')}đ</p>
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

let currentSimilarProducts = []; // Mảng lưu trữ để cộng dồn nếu cần

async function fetchProduct(isLoadMore = false) {
  if (!isLoadMore) {
    page = 1;
    productShirtSame.innerHTML = "";
  }

  const url = `${ENV.API_URL}/api/product/similar?categoryId=${currentCategoryId}&excludeId=${productID}&limit=${limit}&page=${page}`;

  try {
    const res = await fetch(url);
    const result = await res.json();
    const newProducts = result.products;

    renderProduct(productShirtSame, newProducts, isLoadMore); 

    if (result.totalPage && page >= result.totalPage) {
      loadMoreBtn.classList.add('hidden');
    } else if (newProducts.length < limit) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm tương tự:", error);
  }
}



loadMoreBtn.addEventListener("click", () => {
  page++;
  fetchProduct(true)
  // loadMoreBtn.classList.add('hidden')
});


//
// hien co bao nhieu san pham tren icon gio hang 
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];
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
  // Ẩn nếu chưa đăng nhập
  if (quantityElement) {
    quantityElement.classList.add('hidden');
  }
}
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
buttonMyAccount.addEventListener('click', () => {
  if (currentUser) {
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
// lay du lieu cho trang product-detail 
const params = new URLSearchParams(window.location.search);
const productID = params.get('id');
let currentCategoryId = null;

fetch(`${ENV.API_URL}/api/product/${productID}`)
  .then(res => res.json())
  .then(productDetail => {

    if (!productDetail) return;
    currentCategoryId = productDetail.categoryId;
    const detailMain = document.querySelector('.detail-main');

    const sizeHTML = productDetail.sizes.map(item => {
      return `<option value="${item}">Size ${item}</option>`;
    }).join('');

    let priceHTML = `<p class="price-detail">${productDetail.price.toLocaleString('vi-VN')} VND</p>`;
    if (productDetail.priceSale > 0 && productDetail.priceSale < productDetail.price) {
      priceHTML = `<p class="price-detail">${productDetail.priceSale.toLocaleString('vi-VN')} VND</p>`;
    }

    detailMain.innerHTML = `
      <div class="img-detail">
          <img src="${ENV.API_URL}/uploads/${productDetail.imageURL}" alt="">

          <div class="product_overlay_detail"></div>
      </div>
      <div class="content-product">
          <p class="name-detail">${productDetail.name}</p>
          ${priceHTML}
          <div class="size-detail-drop">
              <select id="select-drop-size">
                  ${sizeHTML}
              </select>
          </div>
          <p class="thanh-chan"></p>
          <div class="input-detail-product">
              <label class="content-sl">Số Lượng</label>
              <span class="span-detail minus">-</span>
              <input type="number" id="quantity-detail" min="1" value="1">
              <span class="span-detail plus">+</span>
          </div>
          <button class="button-detail">Add to cart</button>
          <p class="thanh-chan"></p>
          <div class="mo-to-product">
              <p class="mo-ta">Mô tả</p>
              <ul class="description-detail">
                  <li>${productDetail.description}</li>
              </ul>
          </div>
      </div>
    `;
    const spanMinus = document.querySelector('.minus');
    const spanPlus = document.querySelector('.plus');
    const quantityDetail = document.getElementById('quantity-detail')
    // let quantity = 1;

    // tru san pham
    spanMinus.addEventListener('click', () => {
      let current = Number(quantityDetail.value) || 1;
      if (current > 1) {
        quantityDetail.value = current - 1;
      }
    })

    // cong them san pham 
    spanPlus.addEventListener('click', () => {
      let current = Number(quantityDetail.value) || 1;
      quantityDetail.value = current + 1
    })
    const addToCart = document.querySelector('.button-detail');
    addToCart.addEventListener('click', () => {
      // const user = localStorage.getItem('user')
      // const userParse = JSON.parse(user);
      const currentUser = localStorage.getItem('currentUser');
      const parseUser = JSON.parse(currentUser)

      if (!parseUser) {
        alert('Đăng nhập trước khi thêm vào giỏ hàng')
        window.location.href = 'login.html'
        return;
      }




      const name = document.querySelector('.name-detail').textContent;
      const price = document.querySelector('.price-detail').textContent;
      const dropSizes = document.getElementById('select-drop-size').value;
      const quantity = parseInt(document.getElementById('quantity-detail').value);
      const img = productDetail.imageURL
      const id = productDetail.id;
      // lay localStorage ve 
      const currentCart = localStorage.getItem('cart');
      let cart = [];
      if (currentCart !== null) {
        cart = JSON.parse(currentCart);
      }



      const newProductCart = {
        id,
        name,
        price,
        sizes: dropSizes,
        quantity,
        img,
        email: parseUser.email
      }
      const cartIndex = cart.find(item => {
        return item.id === id && item.sizes == dropSizes && item.email === parseUser.email;
      });

      if (cartIndex) {
        cartIndex.quantity += quantity;
      }
      else {
        cart.push(newProductCart)
        console.log(cart)
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      alert('Thêm giỏ hàng thành công')
      window.location.href = 'cart.html'
    })
    fetchProduct();
  }
);