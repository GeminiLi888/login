document.addEventListener("DOMContentLoaded", function() {
    const identitySelect = document.getElementById("identity");
    const customerInfo = document.getElementById("customerInfo");
    const employeeInfo = document.getElementById("employeeInfo");
    const supplierInfo = document.getElementById("supplierInfo");

    identitySelect.addEventListener("change", function () {
        const selectedIdentity = identitySelect.value;
        if (selectedIdentity === "customer") {
            customerInfo.style.display = "block";
            employeeInfo.style.display = "none";
            supplierInfo.style.display = "none";
            setRequired(customerInfo, true);
            setRequired(employeeInfo, false);
            setRequired(supplierInfo, false);
        } else if (selectedIdentity === "employee") {
            customerInfo.style.display = "none";
            employeeInfo.style.display = "block";
            supplierInfo.style.display = "none";
            setRequired(customerInfo, false);
            setRequired(employeeInfo, true);
            setRequired(supplierInfo, false);
        } else if (selectedIdentity === "supplier") {
            customerInfo.style.display = "none";
            employeeInfo.style.display = "none";
            supplierInfo.style.display = "block";
            setRequired(customerInfo, false);
            setRequired(employeeInfo, false);
            setRequired(supplierInfo, true);
        } else {
            customerInfo.style.display = "none";
            employeeInfo.style.display = "none";
            supplierInfo.style.display = "none";
            setRequired(customerInfo, false);
            setRequired(employeeInfo, false);
            setRequired(supplierInfo, false);
        }
    });

    function setRequired(container, required) {
        const inputFields = container.querySelectorAll("input");
        inputFields.forEach(function (input) {
            input.required = required;
        });
    }

    document.getElementById("registerForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const combinedData = {};

        for (const [key, value] of formData.entries()) {
            // 忽略来自其他表的空字段
            if (value.trim() !== "") {
                combinedData[key] = value;
            }
        }

        // 添加 identifier 字段并根据选择的身份设置值
        switch (document.getElementById("identity").value) {
            case "customer":
                combinedData["identifier"] = 1;
                break;
            case "employee":
                combinedData["identifier"] = 2;
                break;
            case "supplier":
                combinedData["identifier"] = 3;
                break;
        }
        delete combinedData["identity"];

        fetch('hhttp://10.49.3.62:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(combinedData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 200) {
                alert('注册成功,请返回登陆界面登录！');
            } else if (data.status === 404) {
                alert('ID 已被注册');
            } else {
                alert('服务器异常：' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('注册失败：' + error.message);
        });
    });
});
