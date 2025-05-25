Book Review API


- Project setup
    - Make sure node is installed
    - Install dependency using "npm i", this will install all dependency which is used in project
    - Create .env file in root directory with given variables (PORT = 3000 MONGODB_URL = 'mongodb://localhost:27017/BookReviewDB'  JWT_TOKEN = "rudransh")


- Run Project Locally
    - open project in vscode and in terminal write "node server", this will start the server


- API Requests
    - User
        - to register user use this  "http://localhost:3000/signup"  with post http request
            - in body use json like this
                {
                    "name":"rudransh",
                    "email":"rudransh@gmail.com",
                    "password":"rudransh"
                }
        - to login use this "http://localhost:3000/login" with get http request
            - in body use json like this
                {
                    "email":"rudransh@gmail.com"
                    "password":"rudransh"
                }
    - Book
        - to add book use this url "http://localhost:3000/books". with post http request
            - in body use json like this
                {
                    "title":"The Greatest Gatsby",
                    "author":"F. Scott Fitzgerald",
                    "genre":"Novel"
                }
        - to get all books use this url "http://localhost:3000/books" , with get request
            - optional in body to filter by genre and author
                {
                    "genre":"name of genre",
                    "author":"name of author"
                }
            - optional in url to get all books with pagination "http://localhost:3000/books?page=2&limit=10" 

        - to get detail of single book use this url "http://localhost:3000/books/:id", with get request and replace ":id" with actual id of book

            - optional in url to get reviews of book in pagination for url will be like "http://localhost:3000/books/:id?page=1&limit=10" with same get request
        
        - add review in book, use url ""http://localhost:3000/books/:id/reviews" with post request

            - body will be like
                {
                    "rating": 3 (between 0 to 5)
                    "review":"good book"
                }

    - Review
        - update review , use this url "http://localhost:3000/reviews/:id", with put request and replace ":id" with actual id of review
            - body will be like
                {
                    "rating": 2,
                    "review": "nice book"
                }
        - delete review, use this url "http://localhost:3000/:id", with delete request and replace ":id" with actual id of book
            no body require


