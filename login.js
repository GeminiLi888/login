document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", loginUser);
});

function loginUser() {
    const userId = document.getElementById("userIdInput").value;
    const password = document.getElementById("passwordInput").value;
    localStorage.setItem('id', userId);
    localStorage.setItem('pw', password);
    // 构建请求体参数
    const requestBody = {
        id: userId,
        password: password
    };

    fetch("http://10.49.3.62:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        handleLoginResponse(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function handleLoginResponse(response) {
    const status = response.status;
    const message = response.message;

    if (status === 200) {
        const identifier = response.data.identifier; 
        localStorage.setItem('identifier', identifier);
        redirectToDashboard(identifier);
        //redirectToDashboard(identifier);
    } else {
        alert(message);
    }
}

function redirectToDashboard(identifier) {
    let dashboardUrl = "";
    switch (identifier) {
        case 1: // 顾客
           dashboardUrl ="../产品/c_show.html";
        
            break;
        case 2: // 雇员
            dashboardUrl = "../订单/e_order.html";
            break;
        case 3: // 供应商
            dashboardUrl = "../统计/s_c.html";
            break;
        default:
            dashboardUrl = "error.html"; // 未知角色
    }
    window.location.href = dashboardUrl;
}