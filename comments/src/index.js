import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = uuidv4();
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: 'pending' });

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });

  res.status(201).json(comments);
});

app.post('/events', async (req, res) => {
  console.log('Received Event in comments: ', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        postId, id, status, content
      }
    })
  }

  res.status(200).send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
