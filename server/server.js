const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// Connect to MongoDB
const arshMongoUrl = 'mongodb+srv://arshbhatia2311:6bGFUGr7B0957UbP@cluster0.onmzeqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const shubhiMongoUrl = 'mongodb+srv://guptashubhi2209:i3JYxWuVTE3HAmqx@cluster0.1ublo6t.mongodb.net/';

mongoose.connect(arshMongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
  priority: Number ,
  status : String,
  description: String
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

app.patch('/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndRemove(req.params.id);
  res.json({ message: 'Todo deleted successfully' });
});