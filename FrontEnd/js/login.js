const url="http://localhost:5678/api/users/login";
const myEmail = document.getElementById("email");
const myPassword = document.getElementById("password");
const connect = document.querySelector("input[type='submit']");
const myForm = document.getElementById("myform");
const emailError = document.querySelector(".emailError");
const passwordError = document.querySelector(".passwordError");

const User ={
    email:"",
    password:"",
};

//evenement
// submit
myForm.addEventListener("submit",(e) => {
    e.preventDefault();
    e.stopPropagation();
    loginUser();
});

// email
myEmail.addEventListener("input",(e) => {
    myEmail.reportValidity();
    User.email = e.target.value;
});

// mot de passe
myPassword.addEventListener("input", (e) => {
    myPassword.reportValidity();
    User.password = e.target.value;
});
// chargement DOM
document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    User.email = myEmail.value;
    User.password = myPassword.value;
    console.log(User);
  });

  async function loginUser() {
    try {
      await fetch(url, {
        method: "POST",
         headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(User),
      })
        .then((response) => response.json())
        .then((responseData) => {
          data = responseData;
          console.log(data);
        });
      if (data.message) {
        emailError.textContent = "Email incorrect!";
      } else if (data.error) {
        passwordError.textContent = "mot de passe oublié!";
      } else {
        
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      }
    } catch (error) {
      console.log(error);
    } 
  }
  




