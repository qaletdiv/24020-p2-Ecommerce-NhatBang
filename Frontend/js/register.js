import { imagesList, products } from './products.data.js';
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

/// click vao nut dang ky 
const inputName = document.querySelector('#input-name-re');
const inputEmail = document.querySelector('#input-email-re');
const inputNumber = document.querySelector('#input-number-re') ;
const inputAddress = document.querySelector('#input-address-re') ;
const inputPassword = document.querySelector('#input-password-re');

const buttonRegister = document.querySelector('.Button-register');
const loadUser = localStorage.getItem('user');
let user = [];
if( loadUser !== null) {
    user = JSON.parse(loadUser)
}
buttonRegister.addEventListener('click' ,async (event) => {
    event.preventDefault();
    const fullname= inputName.value.trim();
    const email = inputEmail.value.trim();
    const phone= inputNumber.value.trim() ;
    const address = inputAddress.value.trim() ;
    const password = inputPassword.value.trim();
  if (fullname === '' || email === '' || phone === '' || address === '' || password === ''){
        alert('Không được bỏ trống');
        return ;
    }
    if(password.length < 6){
        alert('Mật khẩu trên 6 chữ số')
        return ;
    }
    
    try {
      const res = await fetch(`${ENV.API_URL}/api/auth/register` ,{
          method : 'POST' ,
          headers : {
            'Content-Type' : 'application/json' 
          },
          body : JSON.stringify({
            fullname ,
             email , 
             phone ,
             address ,
             password ,

          })
      })
      const data = await res.json() ;

      if (!res.ok) {
        // console.log(data);
        document.getElementById('name-error').innerText = '';
        document.getElementById('email-error').innerText = '';
        document.getElementById('phone-error').innerText = '';  
        document.getElementById('address-error').innerText = '';
        document.getElementById('password-error').innerText = '';

        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach(err => {
            if (err.path === 'fullname') document.getElementById('name-error').innerText = err.msg;
            if (err.path === 'email') document.getElementById('email-error').innerText = err.msg;
            if (err.path === 'phone') document.getElementById('phone-error').innerText = err.msg;
            if (err.path === 'address') document.getElementById('address-error').innerText = err.msg;
            if (err.path === 'password') document.getElementById('password-error').innerText = err.msg;
          });
        } else {
          document.getElementById('email-error').innerText = data.errors.msg || 'Email đã tồn tại'
        }

        return; // không cho chạy tiếp
      }
      alert('Đăng ký thành công')
      window.location.href = 'login.html'
    } catch (error) {
      alert('Lỗi kết nối server');
    }


})
//
// hien co bao nhieu san pham tren icon gio hang 
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const quantityElement = document.querySelector('.update-content-cart');

if (currentUser && quantityElement) {
  const totalQuantity = cartItems.reduce((total, item) => total + Number(item.quantity   ), 0);

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
buttonMyAccount.addEventListener('click' ,() => {
  if(pareUser) {
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