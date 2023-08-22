
const user_id_session = document.querySelector("#user_id_session").getAttribute("value")


// login --->
if (user_id_session == "None")
{
  const login_btn = document.querySelector("#login-btn")
  login_btn.addEventListener('click', function(){
    const loginModal = document.querySelector("#loginModal .modal-body")
    const login_url = "/login"
    fetch(login_url)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
        loginModal.innerHTML = html     
    });
  })
}



// register --->
if (user_id_session == "None")
{
  const register_btn = document.querySelector("#register-btn")
  register_btn.addEventListener('click', function(){
    const registerModal = document.querySelector("#registerModal .modal-body")
    const register_url = "/register"
    fetch(register_url)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      registerModal.innerHTML = html     
    });
  })
}





if (user_id_session != "None"){
  const add_new_post = document.querySelector("#add_new_post_nav")

  add_new_post.addEventListener('click', function(){

  // add new post --->
  const add_new_post_Modal = document.querySelector("#addNewPostModal .modal-body")
  const add_new_post_url = "/add-new-post"

  // just fetch add new post for login users !
  fetch(add_new_post_url)
  .then((response) => {
    return response.text();
  })
  .then((html) => {
    add_new_post_Modal.innerHTML = html     
  });


  })
}


// edit post list view
if (user_id_session != "None"){

  const edit_post = document.getElementById("edit_post_nav")
  edit_post.addEventListener('click', function(){

    const edit_posts_Modal = document.querySelector("#editPostModel .modal-body")
    const edit_posts_url = "/edit-posts"
    
    if (user_id_session != "None"){
      fetch(edit_posts_url)
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        edit_posts_Modal.innerHTML = html     
      });
    }  

  })
}



// add new comment 
if (user_id_session != "None")
{
  function addNewComment (e) {
    // get post_id
    const parentEelement = e.parentNode;
    const post_id = parentEelement.querySelector("[name='post_id']").getAttribute("value")
    const addNewCommentModal = document.querySelector("#addNewCommentModal .modal-body")
    const addNewComment_url = "/add-new-comment"
    fetch(addNewComment_url)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      addNewCommentModal.innerHTML = html

    // get all posts from api
    fetch('/posts_api')
    .then(response => response.json())
    .then(data => {
      // find post
      find_post = data.filter(p => p.id == post_id)[0]
      post_title = find_post['title']
      const modalTitle = document.querySelector("#addNewCommentModal #addNewCommentModalLabel")
      modalTitle.innerHTML = `Add New Comment For ${post_title}`
    })

      const hidden_input = addNewCommentModal.querySelector("[name='post_id']")
      hidden_input.value = post_id
      const newComment_form = addNewCommentModal.querySelector('form')
      const submit_comment = addNewCommentModal.querySelector("#submit_comment")
      // if click on add new comment btn then send form to /add-new-comment
      submit_comment.addEventListener('click', function(){
        newComment_form.submit()
      })

    });


  }
}