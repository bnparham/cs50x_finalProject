import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session,jsonify
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

from time import gmtime, strftime

# Configure application
app = Flask(__name__)

if __name__ == '__main__' :
    app.run(debug=True)
    
# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")

OFFSET = {'offset' : 0}
POST_ID = {}

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
def index():
    """Show portfolio of stocks"""
    alert_new_post = session.get("alert_new_post", None)
    session['alert_new_post'] = None
    user_id = session.get('user_id',None)
    username = None
    if (user_id):
        username = db.execute("SELECT username FROM users where id = ?",user_id)[0]['username']
    return render_template('home.html', alert_new_post=alert_new_post,user_id=user_id,username=username)

@app.route("/edit-posts", methods=["GET"])
@login_required
def edit_post_view():
    get_posts = db.execute(
        """
        SELECT id,title FROM posts
        ORDER BY date DESC
        """
    )
    return render_template('edit-posts-list.html',posts=get_posts)
    

@app.route("/edit-post-form", methods=["GET", "POST"])
@login_required
def edit_post_form():
    if request.method == "POST":
        edit_title = request.form.get("edit-title")
        edit_img = request.form.get("edit-img")
        edit_content = request.form.get("edit-content")
        edit_post_id = request.form.get("edit-post-id")
        edit_data = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        edit_author = session.get('user_id')
        db.execute("""
                    UPDATE posts
                    SET author = ? ,title = ? , img = ?, content = ?, date = ?
                    WHERE id = ?;
                    """,edit_author,edit_title,edit_img,edit_content,edit_data,edit_post_id)
        
        return redirect ('/')
    else:
        return render_template("edit-post-form.html")

@app.route("/add-new-post", methods=["GET", "POST"])
@login_required
def add_new_post_view():
    if request.method == "POST":
        title = request.form.get("title")
        img = request.form.get("img")
        content = request.form.get("content")
        author = session["user_id"]
        date = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        
        if not title:
            return apology("must provide title", 400)
        elif not img:
            return apology("must provide img", 400)
        elif not content:
            return apology("must provide content", 400) 
        db.execute("INSERT INTO posts (author,title,img,content,date) VALUES (?,?,?,?,?);",author,title,img,content,date)
        
        session['alert_new_post'] = True
        
        return redirect("/")
    else:
        return render_template('addNewPost.html')
    
    
@app.route("/comments", methods=["GET", "POST"])
def comments_view():
    if request.method == "POST":
        POST_ID['post_id'] = request.form.get("post_id")
        return redirect("/")
    else:
        post_id = POST_ID.get('post_id',db.execute("SELECT id from posts ORDER BY date DESC LIMIT 1")[0]['id'])
        get_comments = db.execute(
                """
                SELECT comments.*,users.username,posts.title FROM comments 
                LEFT JOIN users
                ON comments.user_id = users.id
                LEFT JOIN posts
                ON comments.post_id = posts.id
                WHERE post_id = ?;
                """,
                post_id
        )

        get_post_title = db.execute("""
                SELECT title
                FROM posts
                WHERE id = ?;   
                """,post_id)[0]['title']

        return render_template("comments.html", comments=get_comments,post_title = get_post_title)

@app.route("/posts", methods=["GET", "POST"])
def posts_view():
    if request.method == "POST":
        offset = request.form.get("offset")
        OFFSET['offset'] = OFFSET.get('offset') + int(offset)
        return redirect('/')
    else:
        offset = OFFSET['offset']
        len_posts = len(db.execute("SELECT * from posts"))
        
        # reset offset of page pagination if reach to maximum post size
        if(offset >= len_posts): 
            OFFSET['offset'] = 0
            offset = OFFSET['offset']
        elif (offset < 0):
            # Find the last coefficient of the number 3 before the total number of posts
            q = len_posts
            while (q % 3 != 0):
                q  = q - 1
            OFFSET['offset'] = q
            offset = OFFSET['offset']
        pagination = offset // 3 + 1
            
        get_posts = db.execute("""
                    SELECT posts.*,users.username FROM posts 
                    LEFT JOIN users
                    ON posts.author = users.id
                    ORDER BY date DESC
                    LIMIT 3
                    OFFSET ?
                    """,offset)
        return render_template('posts.html', posts=get_posts, pagination=pagination)

# @app.route("/buy", methods=["GET", "POST"])
# @login_required
# def buy():
#     """Buy shares of stock"""
#     return apology("TODO")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")

@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":
        username = request.form.get("username")
        rows = db.execute("SELECT * FROM users WHERE username = ?;", username)
        if not username:
            return apology("must provide username", 400)

        if len(rows) != 0:
            return apology("user with this username is exist!", 400)

        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        if password and confirmation:
            if password == confirmation:
                # user can be register to database
                hash_password = generate_password_hash(password)
                db.execute("INSERT INTO users (username,hash) VALUES (?,?);", username,hash_password)

                return redirect('/')
            else:
                return apology("password and confirmation are not same", 400)
        else:
            return apology("must provide password and confirmation password", 400)
    else:
        user_id = session.get("user_id")
        if(user_id):
            return redirect('/')
        return render_template("register.html")


# --- api ---
@app.route('/posts_api', methods=["GET"])
def post_api():
    get_posts = db.execute("""
            SELECT posts.*,users.username FROM posts 
            LEFT JOIN users
            ON posts.author = users.id
            ORDER BY date DESC
            """)
    return jsonify(get_posts)