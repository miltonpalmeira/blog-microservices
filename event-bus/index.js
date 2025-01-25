import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log('localhost:4000 - ' + err.message);
  });
  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log('localhost:4001 - ' + err.message);
  });
  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log('localhost:4002 - ' + err.message);
  });
  axios.post('http://localhost:4003/events', event).catch((err) => {
    console.log('localhost:4003 - ' + err.message);
  });

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
