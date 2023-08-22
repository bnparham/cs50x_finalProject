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

// -------------------