# ParhamBN Blog Project

## CS50x 2023 Final Project
youtube link : https://youtu.be/QLCtek9yYp4

This project is built using Flask for the server-side logic and utilizes JavaScript, CSS, and HTML for the client-side interface and interactivity.

## Features

- **Login and Register as Modals**: The project incorporates a seamless user experience by opening the login and registration pages as modal pop-ups. JavaScript handles this functionality, dynamically fetching the HTML content of these pages and injecting them into the modals for a smooth and user-friendly interface.

- **Dynamic Posts Loading**: The project employs dynamic loading of posts from the `/posts/` URL. JavaScript takes charge of this section, effectively turning it into a modular component. The HTML content from the specified URL is fetched and seamlessly integrated into the home page, creating an interactive and component-like user experience.

- **Modal for Adding New Posts**: Adding new posts is made convenient through the use of a modal. JavaScript is responsible for handling the `/add-new-post` URL, fetching the HTML content of the new post page, and presenting it within the modal.

- **Edit and Update Posts with Modal**: The project provides a user-friendly interface for editing and updating posts. When users click on the 'Edit' option for a post, JavaScript sends a request to the `/edit-post-form` URL, which responds with a modal containing a pre-filled form. This form is populated with data retrieved from the `/posts_api` endpoint, displaying the post's title and content. Users can make changes, and when they submit the form to `/edit-post-form`, the post is updated with the new content.

- **Delete Posts and Comments**: Users have the capability to remove their own posts. This functionality is implemented as a modal for a user-friendly experience. When a user chooses to delete a post, JavaScript sends a request to the `/remove-post` URL. After confirmation, the targeted post and its associated comments are permanently deleted, keeping the user's content management seamless and efficient.


- **User Comments**: Users can actively engage with posts by adding comments. To submit a comment, users must be logged in, ensuring a secure and interactive commenting experience. This feature promotes user interaction, feedback, and discussion within the community. Comments can be added and viewed for each post, facilitating meaningful conversations and interactions.

  This section is powered by JavaScript, which sends requests to the `/add-new-comment` URL. This endpoint is responsible for adding new comments to the related post and associating them with the user, enhancing the real-time interactivity of the comment system.

