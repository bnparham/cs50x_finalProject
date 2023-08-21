const commentSection = document.querySelector("#comment-section")
const comments_url = "/comments"
fetch(comments_url)
.then((response) => {
  return response.text();
})
.then((html) => {
    commentSection.innerHTML = html     
});
