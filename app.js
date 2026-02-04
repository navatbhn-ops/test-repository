const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const async = require('async');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Sample data
let users = [
  { id: 1, name: 'John Doe', createdAt: '2020-01-15' },
  { id: 2, name: 'Jane Smith', createdAt: '2021-03-22' },
  { id: 3, name: 'Bob Johnson', createdAt: '2019-11-08' }
];

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the EOL Dependencies Test App!');
});

// Get all users
app.get('/api/users', (req, res) => {
  // Using lodash (old version)
  const sortedUsers = _.sortBy(users, 'name');
  
  // Using moment (old version - now deprecated)
  const usersWithFormattedDates = _.map(sortedUsers, (user) => {
    return {
      ...user,
      createdAt: moment(user.createdAt).format('MMMM Do YYYY'),
      daysAgo: moment().diff(moment(user.createdAt), 'days')
    };
  });
  
  res.json(usersWithFormattedDates);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = _.find(users, { id: userId });
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// Create new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    createdAt: moment().format('YYYY-MM-DD')
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// Fetch external data using deprecated 'request' library
app.get('/api/external-data', (req, res) => {
  request('https://jsonplaceholder.typicode.com/posts/1', (error, response, body) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch external data' });
    }
    res.json(JSON.parse(body));
  });
});

// Fetch data using old axios version
app.get('/api/axios-data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data with axios' });
  }
});

// Async operations using old async library
app.get('/api/parallel-tasks', (req, res) => {
  async.parallel([
    (callback) => {
      setTimeout(() => {
        callback(null, 'Task 1 completed');
      }, 100);
    },
    (callback) => {
      setTimeout(() => {
        callback(null, 'Task 2 completed');
      }, 200);
    },
    (callback) => {
      setTimeout(() => {
        callback(null, 'Task 3 completed');
      }, 150);
    }
  ], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Tasks failed' });
    }
    res.json({ results });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});

module.exports = app;
