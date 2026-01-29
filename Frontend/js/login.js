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



const inputEmail = document.getElementById('email-login');
const inputPassword = document.getElementById('password-login');
const buttonLogin = document.querySelector('.button-login');

buttonLogin.addEventListener('click', async (event) => {
  event.preventDefault();

  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  document.getElementById('email-error').innerText = '';
  document.getElementById('password-error').innerText = '';

  let hasError = false;

  if (email === '') {
    document.getElementById('email-error').innerText = 'Không được để trống email hoặc SĐT';
    hasError = true;
  }

  if (password === '') {
    document.getElementById('password-error').innerText = 'Không được để trống mật khẩu';
    hasError = true;
  } else if (password.length < 6) {
    document.getElementById('password-error').innerText = 'Mật khẩu tối thiểu 6 ký tự';
    hasError = true;
  }

  if (hasError) return;

  try {
    const res = await fetch(`${ENV.API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailOrPhone: email,
        password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      document.getElementById('email-error').innerText = '';
      document.getElementById('password-error').innerText = '';

      if (data.errors && Array.isArray(data.errors)) {
        data.errors.forEach(err => {
          if (err.path === 'emailOrPhone')
            document.getElementById('email-error').innerText = err.msg;
          if (err.path === 'password')
            document.getElementById('password-error').innerText = err.msg;
        });
      } else {
        // lỗi sai mật khẩu / sai email
        document.getElementById('email-error').innerText = data.message || 'Sai Mail hoặc số diện thoại';
        document.getElementById('password-error').innerText = data.message || 'Sai mật khẩu';
      }

      return;
    }

    // chỉ chạy khi đăng nhập thành công
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));

    alert('Đăng nhập thành công');
    window.location.href = 'index.html';

  } catch (error) {
    alert('Lỗi kết nối server');
  }
});


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
