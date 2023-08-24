# ParhamBN Blog Project

## CS50x 2023 Final Project
youtube link : https://youtu.be/QLCtek9yYp4

This project is built using Flask for the server-side logic and utilizes JavaScript, CSS, and HTML for the client-side interface and interactivity.


# Requiments

**1 - Installing pipenv**

**Pipenv** is a Python virtualenv management tool that supports a multitude of systems and nicely bridges the gaps between pip, python (using system python, pyenv or asdf) and virtualenv. _Linux, macOS, and Windows are all first-class citizens in pipenv._

Pipenv automatically creates and manages a virtualenv for your projects, as well as adds/removes packages from your `Pipfile` as you install/uninstall packages. It also generates a project `Pipfile.lock`, which is used to produce deterministic builds.

**Pipenv can be installed with Python 3.7 and above.**

For most users, we recommend installing Pipenv using `pip`:

```
pip install --user pipenv
```

For additional installation methods and more information about Pipenv, please refer to the [package documentation](https://pypi.org/project/pipenv/).

**2 - Installing project dependencies**

To install the required packages for this project, navigate to the project directory in the terminal and enter the command :

```
pipenv install
```

This command will automatically install the packages specified in the `Pipfile` file.

**3 - Setting up and Running the Project**

Before using the project, activate the virtual environment by running :

```
pipenv shell
```

in the project directory. Once the virtual environment is active, you can proceed to execute other commands, such as `flask --debug run`, to run the server.


## Features

- **Login and Register as Modals**: The project incorporates a seamless user experience by opening the login and registration pages as modal pop-ups. JavaScript handles this functionality, dynamically fetching the HTML content of these pages and injecting them into the modals for a smooth and user-friendly interface.

- **Dynamic Posts Loading**: The project employs dynamic loading of posts from the `/posts/` URL. JavaScript takes charge of this section, effectively turning it into a modular component. The HTML content from the specified URL is fetched and seamlessly integrated into the home page, creating an interactive and component-like user experience.

- **Modal for Adding New Posts**: Adding new posts is made convenient through the use of a modal. JavaScript is responsible for handling the `/add-new-post` URL, fetching the HTML content of the new post page, and presenting it within the modal.

- **Edit and Update Posts with Modal**: The project provides a user-friendly interface for editing and updating posts. When users click on the 'Edit' option for a post, JavaScript sends a request to the `/edit-post-form` URL, which responds with a modal containing a pre-filled form. This form is populated with data retrieved from the `/posts_api` endpoint, displaying the post's title and content. Users can make changes, and when they submit the form to `/edit-post-form`, the post is updated with the new content.

- **Delete Posts and Comments**: Users have the capability to remove their own posts. This functionality is implemented as a modal for a user-friendly experience. When a user chooses to delete a post, JavaScript sends a request to the `/remove-post` URL. After confirmation, the targeted post and its associated comments are permanently deleted, keeping the user's content management seamless and efficient.


- **User Comments**: Users can actively engage with posts by adding comments. To submit a comment, users must be logged in, ensuring a secure and interactive commenting experience. This feature promotes user interaction, feedback, and discussion within the community. Comments can be added and viewed for each post, facilitating meaningful conversations and interactions.

  This section is powered by JavaScript, which sends requests to the `/add-new-comment` URL. This endpoint is responsible for adding new comments to the related post and associating them with the user, enhancing the real-time interactivity of the comment system.

