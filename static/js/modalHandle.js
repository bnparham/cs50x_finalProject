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

// add new post --->
const add_new_post_Modal = document.querySelector("#addNewPostModal .modal-body")
const add_new_post_url = "/add-new-post"
fetch(add_new_post_url)
.then((response) => {
  return response.text();
})
.then((html) => {
  add_new_post_Modal.innerHTML = html     
});
