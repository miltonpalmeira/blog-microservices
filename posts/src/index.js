import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

// GET /posts - Return all posts
app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

// POST /posts - Create a new post
app.post('/posts/create', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const id = uuidv4();
  posts[id] = {
    id,
    title
  };

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title
    }
  });

  res.status(201).json(posts[id]);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Endpoint to handle incoming events
app.post('/events', (req, res) => {
  console.log('Received Event in posts: ', req.body.type);

  res.status(200).send({});
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
