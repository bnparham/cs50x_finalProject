# ParhamBN Blog Project

This project is built using Flask for the server-side logic and utilizes JavaScript, CSS, and HTML for the client-side interface and interactivity.

## Features

- **Login and Register as Modals**: The project incorporates a seamless user experience by opening the login and registration pages as modal pop-ups. JavaScript handles this functionality, dynamically fetching the HTML content of these pages and injecting them into the modals for a smooth and user-friendly interface.

- **Dynamic Posts Loading**: The project employs dynamic loading of posts from the '/posts/' URL. JavaScript takes charge of this section, effectively turning it into a modular component. The HTML content from the specified URL is fetched and seamlessly integrated into the home page, creating an interactive and component-like user experience.

- **Modal for Adding New Posts**: Adding new posts is made convenient through the use of a modal. JavaScript is responsible for handling the '/add-new-post' URL, fetching the HTML content of the new post page, and presenting it within the modal.

- **Edit and Update Posts with Modal**: The project provides a user-friendly interface for editing and updating posts. When users click on the 'Edit' option for a post, JavaScript sends a request to the '/edit-post-form' URL, which responds with a modal containing a pre-filled form. This form is populated with data retrieved from the '/posts_api' endpoint, displaying the post's title and content. Users can make changes, and when they submit the form to '/edit-post-form', the post is updated with the new content.

