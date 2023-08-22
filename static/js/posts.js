

const postSection = document.querySelector("#post-section")
const posts_url = "/posts"
fetch(posts_url)
.then((response) => {
  return response.text();
})
.then((html) => {
    postSection.innerHTML = html     
});

// --- pagination ---
const form = document.querySelector("#form_post")
const input = document.querySelector("#offset")

const next_page = () => {
  console.log("next_page")
  offset = Number(input.value)
  input.value = offset + 3
  form.submit()
}

const pervious_page = () => {
  console.log("pervious_page")
  offset = Number(input.value)
  input.value = offset - 3
  form.submit()
}


const myFunction = () => {

  // send post id to /comments 
  const posts = document.querySelectorAll("#post-section .card")
  posts.forEach(post => {
    post.addEventListener('click', function() {
      // give post id
      post_id = post.getAttribute("post_id")

      // find hidden input inside each post
      const hiddenValue = document.querySelector("#post-section .card input.hidden-post_id-input")
      hiddenValue.value = post_id
      // find form
      const post_form = document.querySelector("#post-section .card form")
      post_form.submit()
    });
  })
}

const intervalId = setTimeout(myFunction, 500);



//--- Edit Post ---

const edit_post = (e) => {


    const edit_post_form = e.parentNode;
    const post_edit_id = edit_post_form.querySelector("[name='post_edit_id']").getAttribute("value")

    // get all posts from api
    fetch('/posts_api')
    .then(response => response.json())
    .then(data => {
      // find post
      find_post = data.filter(p => p.id == post_edit_id)[0]

      const edit_posts_Modal = document.querySelector("#editPostModel .modal-body")
      const edit_posts_url = "/edit-post-form"
      

      fetch(edit_posts_url)
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        // console.log(html);
        edit_posts_Modal.innerHTML = html     
        const edit_title = edit_posts_Modal.querySelector("#edit-title")
        const edit_img = edit_posts_Modal.querySelector("#edit-img")
        const edit_content = edit_posts_Modal.querySelector("#edit-content")
        const edit_post_id = edit_posts_Modal.querySelector("#edit-post-id") 

        // fill input with data 
        edit_title.value = find_post['title']
        edit_img.value = find_post['img']
        edit_content.value = find_post['content']
        edit_post_id.value = find_post['id']

        edit_post_form = document.querySelector("#edit_post_form")
        edit_post_form.submit()
      });

    })

    


}