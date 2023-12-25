"use strict"

let nameSignUp = document.querySelector("#nameSignUp");
let emailSignUp = document.querySelector("#emailSignUp");
let passwordSignUp = document.querySelector("#passwordSignUp");
let signUpBtn = document.querySelector("#signUpBtn");
let loginBtn = document.querySelector("#loginBtn");
let logOutBtn = document.querySelector("#logOutBtn");

let list = JSON.parse(localStorage.getItem("user")) || [];

//! EventListener
if (signUpBtn) {
    signUpBtn.addEventListener("click", () => { signUp(); });

}

if (loginBtn) {
    loginBtn.addEventListener("click", () => { logIn(); });
}

if (logOutBtn) {
    logOutBtn.addEventListener("click", () => { logOut });
}

//! Sign UP
function signUp() {
    if (nameSignUp.value == "" || emailSignUp.value == "" || passwordSignUp.value == "") {
        document.querySelector("#signValid").innerHTML = '<p class="text-danger my-3">All inputs is required </p>'
        return false;
    }

    let userSignUp = {
        name: nameSignUp.value,
        email: emailSignUp.value,
        password: passwordSignUp.value
    }

    if (list.length == 0) {
        list.push(userSignUp);
        localStorage.setItem("user", JSON.stringify(list));
        document.querySelector("#signValid").innerHTML = '<p class="text-success m-3">Success</p>'
        return true;
    }

    if (emailExists() == false) {
        document.querySelector("#signValid").innerHTML = '<p class="text-danger m-3">email already exists</p>'
    }
    else {
        list.push(userSignUp)
        localStorage.setItem("user", JSON.stringify(list))
        document.querySelector("#signValid").innerHTML = '<p class="text-success m-3">Success</p>'
    }
}

//! check email
function emailExists() {
    for (var i = 0; i < list.length; i++) {
        if (list[i].email.toLowerCase() == emailSignUp.value.toLowerCase()) {
            return false
        }
    }
}

//! log in
function logIn() {
    if (emailSignUp.value == "" || passwordSignUp.value == "") {
        document.querySelector("#logValid").innerHTML = '<p class="text-danger my-3">All inputs is required </p>'
        return false
    }

    for (let i = 0; i < list.length; i++) {
        if (emailSignUp.value == list[i].email && passwordSignUp.value == list[i].password) {
            localStorage.setItem("firstElement", list[i].name)
            goToHome()
        }
        else {
            document.querySelector("#logValid").innerHTML = '<p class="text-danger m-3">incorrect email or password</p>'
        }
    }
}


//! transport between pages
function goToHome() {
    document.querySelector("#loginBtn").innerHTML = window.location.assign("./home.html");
}

//! HOME function
function homee() {
    if (window.location.pathname.includes("home.html")) {
        let username = localStorage.getItem("firstElement");
        if (username) {
            document.getElementById("userName").innerHTML = "Welcome " + username;
        }
    }
}
document.addEventListener("DOMContentLoaded", () => { homee(); });

//! log out
function logOut() {
    localStorage.removeItem("firstElement")
}
