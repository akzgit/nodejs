const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Use cors middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb');

// Create a schema for the contact details
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Create a model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

// Middleware to parse JSON
app.use(express.json());

// API endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Create a new contact record
  const newContact = new Contact({ name, email, message });

  try {
    // Save the contact record to the database
    await newContact.save();
    res.status(201).json({ message: 'Contact details saved successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving contact details.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
