# Algo8 Project

This project is a RESTful API built using Node.js, Express.js, MySQL, JWT authentication, and tested with Mocha, Chai, and Supertest. It provides endpoints for managing user authentication and CRUD operations for blog posts.

## Features

- User authentication (signup, login) with JWT tokens
- CRUD operations for blog posts (create, read, update, delete)
- MySQL database integration for data storage
- Token-based authentication middleware
- Unit tests for API endpoints using Mocha, Chai, and Supertest

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your_username/algo8-project.git
   ```

2. Navigate to the project directory:

   ```
   cd algo8-project
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Set up MySQL database:
   
   - Create a MySQL database named `algo8`.
   - Update the database configuration in `app.js` file if necessary.

5. Run the application:

   ```
   npm start
   ```

6. To run tests:

   ```
   npm test
   ```

## Usage

- **Signup**: Register a new user by making a POST request to `/signup` endpoint with username, password, and name in the request body.

- **Login**: Authenticate a user by making a POST request to `/login` endpoint with username and password in the request body. This will return a JWT token which should be included in subsequent requests.

- **Posts**: Use the `/posts` endpoint for CRUD operations on blog posts. Make sure to include the JWT token in the Authorization header of your requests.

## API Documentation

- **POST /signup**: Register a new user.

  Request Body:
  ```
  {
    "username": "example",
    "password": "password",
    "name": "Example"
  }
  ```

- **POST /login**: Authenticate a user and retrieve JWT token.

  Request Body:
  ```
  {
    "username": "example",
    "password": "password"
  }
  ```

- **GET /posts**: Retrieve all posts.

- **POST /posts**: Create a new post.

  Request Body:
  ```
  {
    "title": "New Post",
    "content": "Post Content"
  }
  ```

- **PUT /posts/:id**: Update an existing post by ID.

  Request Body:
  ```
  {
    "title": "Updated Post",
    "content": "Updated Content"
  }
  ```

- **DELETE /posts/:id**: Delete a post by ID.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

