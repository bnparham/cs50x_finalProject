// login --->
const loginModal = document.querySelector("#loginModal .modal-body")
const login_url = "/login"

fetch(login_url)
.then((response) => {
  return response.text();
})
.then((html) => {
    loginModal.innerHTML = html     
});

// register --->

const registerModal = document.querySelector("#registerModal .modal-body")
const register_url = "/register"
fetch(register_url)
.then((response) => {
  return response.text();
})
.then((html) => {
  registerModal.innerHTML = html     
});
