const express= require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app= express();

// JWT Secret key
const JWT_SECRET = 'your_secret_key';

const connection= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Aryan@123",
    database:"algo8",
})
connection.connect(function(err){
    if(err) throw err;
    console.log("The Database has been connected")

})

app.use(bodyParser.json());

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.sendStatus(401);
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  };


// Get all posts of a user
app.get('/posts', authenticateJWT, (req, res) => {
    const userId = req.user.username; // Assuming user ID is included in the JWT token
    console.log(userId)
    try {
      connection.query('SELECT posts.*, users.name, users.username FROM posts INNER JOIN users ON posts.user_id = users.username WHERE posts.user_id = ?', [userId], (error, results) => {
      if (error) throw error;
      res.json(results);
    });
      
    } catch (error) {
      res.status(404).send('Try With Correct JWT Token')
    }
    
  });
  
  // Create a post
  app.post('/posts', authenticateJWT, (req, res) => {
    const { title, content } = req.body;

    const userId = req.user.username; // Assuming user ID is included in the JWT token
    // console.log(userId.iat)
    
      connection.query('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId], (error, results) => {
        if (error) throw error;
        
        res.status(200).send('Post added successfully');
      });
    
   
  });
  
 // Update a post
app.put('/posts/:id', authenticateJWT, (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const userId = req.user.username; // Assuming user ID is included in the JWT token
  connection.query('SELECT * FROM posts WHERE id = ? AND user_id = ?', [postId, userId], (error, results) => {
    if (error) throw error;
    if (results.length === 0) {
      return res.status(404).send('Post not found or unauthorized to update');
    }
    // Update the post if it exists and belongs to the authenticated user
    connection.query('UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?', [title, content, postId, userId], (error, results) => {
      if (error) throw error;
      res.status(200).send('Post updated successfully');
    });
  });
});

// Delete a post
app.delete('/posts/:id', authenticateJWT, (req, res) => {
  const postId = req.params.id;
  const userId = req.user.username; // Assuming user ID is included in the JWT token
  connection.query('SELECT * FROM posts WHERE id = ? AND user_id = ?', [postId, userId], (error, results) => {
    if (error) throw error;
    if (results.length === 0) {
      return res.status(404).send('Post not found or unauthorized to delete');
    }
    // Delete the post if it exists and belongs to the authenticated user
    connection.query('DELETE FROM posts WHERE id = ? AND user_id = ?', [postId, userId], (error, results) => {
      if (error) throw error;
      res.status(200).send('Post deleted successfully');
    });
  });
});






// Routes for users
app.post('/signup', async(req, res) => {
    const { username, password, name } = req.body;
    console.log(username,password)
    connection.query('INSERT INTO users (username, password, name) VALUES (?, ?, ?)', [username, password, name], (error, results) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          return res.status(400).send('Username already exists! Go to Login Route');
        }
        throw error;
      }
     
      // Generate JWT token for the new user with only username
      const token = jwt.sign({ username }, JWT_SECRET);
      // Send the token along with instructions on how to use it for authentication
      res.status(201).json({
        message: 'User registered successfully',
        token,
        instructions: 'Include the token in the Authorization header of your requests. Example: Authorization: Bearer <token>'
      });
    });
  });
  
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check username and password in the database
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        const user = { username: results[0].username };
        const token = jwt.sign(user, JWT_SECRET);
        res.status(200).json({token });
      } else {
        res.status(401).send('Invalid username or password');
      }
    });
  });
  

module.exports = app;

app.listen(8001,()=>{
    console.log("The Server is listening at port 8001")
    
})