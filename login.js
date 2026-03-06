const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", (e) => {
  const passwordInput = document.getElementById("password-input");
  const usernameInput = document.getElementById("username-input");
  const username = usernameInput.value;
  const password = passwordInput.value;
  

  if(username === "admin" && password === "admin123"){
    window.location.href = "./home.html";
  }
  else{
    alert("Invalid credentials. Try admin / admin123");
  }
});
