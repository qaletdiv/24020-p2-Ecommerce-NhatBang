
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




// kiểm tra đăng nhập
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    alert('Bạn phải đăng nhập trước khi vô trang');
    window.location.href = 'login.html';
}


// hiển thị thông tin user
const infoContainer = document.querySelector('.container');

const divUserMail = document.createElement('div');
divUserMail.classList.add('div-user-mail');
divUserMail.innerHTML = `
    <p><strong>Họ và tên:</strong> <span>${currentUser.fullname}</span></p>
    <p><strong>Email:</strong> <span>${currentUser.email}</span></p>
`;
infoContainer.appendChild(divUserMail);



// hien thi don hang 
const renderOrders = async(orders) => {
    orders.forEach(order => {
        const divElMyAccount = document.createElement('div');
            divElMyAccount.classList.add('div-my-account');
        divElMyAccount.innerHTML = `
            <div class="orders">
                <h3>Lịch sử đặt hàng</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Ngày đặt</th>
                            <th>Tên </th>
                            <th>email</th>
                            <th>Số điện thoại</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            </tr>
                    </thead>
                    <tbody id="orderHistory">
                        <tr>
                        <td>${order.id}</td>
                        <td>${new Date(order.createdAt).toLocaleString('vi-VN')}</td>
                        <td>${order.receiverName}</td>
                        <td>${order.email}</td>
                        <td>${Number(order.phone)}</td>
                        <td>${Number(order.totalPrice).toLocaleString('vi-VN')} đ</td>
                        <td>${order.orderStatus}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
            infoContainer.appendChild(divElMyAccount);
    })
}
const initMyOrder = async () => {
    try {
        const historyOrder = await fetchMyOrders();

        renderOrders(historyOrder);
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
};
const fetchMyOrders = async() => {
    const token = localStorage.getItem('accessToken')  ;
    const res = await fetch(`${ENV.API_URL}/api/historyOrder/`,{
        method :'GET' ,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    if (!res.ok) throw new Error("Không lấy được đơn hàng");

    return await res.json();
}



const loadCartQuantityIcon = async () => {
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
        const searchText = inputFind.value.trim();
        if (searchText !== '') {
            window.location.href = `products.html?search=${encodeURIComponent(searchText)}`;

        }
    }
});
loadCartQuantityIcon() ;
initMyOrder() ;