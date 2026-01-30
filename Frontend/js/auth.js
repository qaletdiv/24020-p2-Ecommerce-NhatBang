/// khi token hết hạn sẽ tự đăng xuất 

export const authFetch = async (url, option = {}) => {
    const token = localStorage.getItem('accessToken');
    const res = await fetch(url ,{
        ...option , 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }) ;
    if (res.status === 401) {
        alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
        return null;
    }

    return res;
}