import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// GET /posts - Return all posts
app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

// POST /posts - Create a new post
app.post('/posts', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const id = uuidv4();  // Generate a unique ID
  posts[id] = {
    id,
    title
  };

  res.status(201).json(posts[id]);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
