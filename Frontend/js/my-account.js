import { user } from './products.data.js';

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
const historyOrder = JSON.parse(localStorage.getItem('historyOrder')) || [];

// kiểm tra đăng nhập
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    alert('Bạn phải đăng nhập trước khi vô trang');
    window.location.href = 'login.html';
}

// lọc đơn hàng theo email user đang login
const infoUsers = historyOrder.filter(item => {
    return item.emailCurrentUser === currentUser.email;
});

// hiển thị thông tin user
const infoContainer = document.querySelector('.container');
const divUserMail = document.createElement('div');
divUserMail.classList.add('div-user-mail');
divUserMail.innerHTML = `
    <p><strong>Họ và tên:</strong> <span>${currentUser.fullname}</span></p>
    <p><strong>Email:</strong> <span>${currentUser.email}</span></p>
`;
infoContainer.appendChild(divUserMail);

// hiển thị lịch sử đơn hàng
infoUsers.forEach(order => {
    const divElMyAccount = document.createElement('div');
    divElMyAccount.classList.add('div-my-account');
    divElMyAccount.innerHTML = `
        <div class="orders">
            <h3>Lịch sử đặt hàng</h3>
            <table>
                <tr>
                    <td>${order.id}</td>    
                    <td>${new Date(order.date).toLocaleString('vi-VN')}</td>
                    <td>${order.total}</td>
                    <td>Đã xác nhận</td>
                </tr>
            </table>
        </div>
    `;
    infoContainer.appendChild(divElMyAccount);
});




// console.log(JSON.parse(localStorage.getItem('checkoutForm')));
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
    if (parseUser) {
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