document.addEventListener("DOMContentLoaded", function(){

let loginForm = document.getElementById("loginForm");
let registerForm = document.getElementById("registerForm");
let title = document.getElementById("formTitle");


let users = JSON.parse(localStorage.getItem("users")) || [];


window.showRegister = function(){
loginForm.style.display = "none";
registerForm.style.display = "block";
title.innerText = "Register";
};

window.showLogin = function(){
loginForm.style.display = "block";
registerForm.style.display = "none";
title.innerText = "Login";
};


registerForm.addEventListener("submit", function(e){
e.preventDefault();

let usn = document.getElementById("regUSN").value;
let email = document.getElementById("regEmail").value;
let role = document.getElementById("regRole").value;
let password = document.getElementById("regPassword").value;
let confirmPassword = document.getElementById("regConfirmPassword").value;


if(password !== confirmPassword){
alert("Passwords do not match");
return;
}

let pattern = /^[a-zA-Z0-9@#$%^&*()._+-]{6,}$/;
if(!pattern.test(password)){
alert("Invalid password");
return;
}


let exists = users.find(u => u.usn === usn && u.role === role);
if(exists){
alert("User already registered");
return;
}


users.push({usn, email, role, password});
localStorage.setItem("users", JSON.stringify(users));

alert("Registration Successful");
showLogin();

});


loginForm.addEventListener("submit", function(e){
e.preventDefault();

let usn = document.getElementById("loginUSN").value;
let pass = document.getElementById("loginPassword").value;
let role = document.getElementById("loginRole").value;


let user = users.find(u => u.usn === usn && u.role === role);

if(!user){
alert("Not registered yet");
return;
}


if(user.password !== pass){
alert("Password does not match");
return;
}

alert("Login Successful as " + role);


if(role === "student"){
window.location.href = "student.html";
}
else if(role === "mentor"){
window.location.href = "mentor.html";
}
else if(role === "hod"){
window.location.href = "hod.html";
}
else if(role === "coordinator"){
window.location.href = "coordinator.html";
}

});

});