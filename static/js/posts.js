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
