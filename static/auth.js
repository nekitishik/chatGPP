let registerForm = document.querySelector(".register form")

registerForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    let data = new FormData(registerForm)
    let login = data.get("login")
    let password = data.get("password")
    let passwordR = data.get("passwordR")
    if (password != passwordR) {
        alert("Пошел Нахуй! Ты въебал попытку регистрации!")
        return
    }
    if(password.length < 8 || login.length < 5){ {
        alert("Эй, Долбоёб! Пароль или юзернейм должен быть не менее 8 символов!")
        return
    }
    }
    fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({login, password})
    }).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err.message))
})
   