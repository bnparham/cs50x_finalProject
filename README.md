# ParhamBN Blog Project

This project is built using Flask for the server-side logic and utilizes JavaScript, CSS, and HTML for the client-side interface and interactivity.

## Features

- **Login and Register as Modals**: The project incorporates a seamless user experience by opening the login and registration pages as modal pop-ups. JavaScript handles this functionality, dynamically fetching the HTML content of these pages and injecting them into the modals for a smooth and user-friendly interface.
-
- **Dynamic Posts Loading**: The project employs dynamic loading of posts from the '/posts/' URL. JavaScript takes charge of this section, effectively turning it into a modular component. The HTML content from the specified URL is fetched and seamlessly integrated into the home page, creating an interactive and component-like user experience.

- **Interactive Comment Section**: The comment section in this project functions as a self-contained component. JavaScript takes control of this feature, seamlessly integrating it into the user interface. When users click on each post, they can view its associated comments without leaving the home page. To add comments, users are required to log in, ensuring secure and authenticated interactions with the '/comment' URL.
