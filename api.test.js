const request = require('supertest');
const app = require('./app'); // Assuming your Express app is defined in app.js

// const { expect } = require('chai');
const { expect } = import('chai');


describe('Blog API', () => {
  let token;

 

  it('should register a new user', (done) => {
    request(app)
      .post('/signup')
      .send({ username: 'example1@gmail.com', password: 'password', name: 'Test User' })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  before((done) => {
    // Log in a user and get the JWT token
    request(app)
      .post('/login')
      .send({ username: 'example1@gmail.com', password: 'password' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('should log in an existing user and return a JWT token', (done) => {
    request(app)
      .post('/login')
      .send({ username: 'example1@gmail.com', password: 'password' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

  it('should retrieve all posts', (done) => {
    
    request(app)
      .get('/posts')
      .set('authorization', `${token}`)
      .expect(200)
      .end((err, res) => {
        
        if (err) return done(err);
        
        done();
      });
  });

  it('should create a new post', (done) => {
    request(app)
      .post('/posts')
      .set('Authorization', `${token}`)
      .send({ title: 'New Post', content: 'Post Content' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should update an existing post', (done) => {
    request(app)
      .put('/posts/1') // Assuming the post ID exists
      .set('Authorization', `${token}`)
      .send({ title: 'Updated Post', content: 'Updated Content' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should delete an existing post', (done) => {
    request(app)
      .delete('/posts/1') // Assuming the post ID exists
      .set('Authorization', `${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
