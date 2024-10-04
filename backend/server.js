require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, 
});

const User = mongoose.model('User', userSchema);


app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password }); 
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'User already exists.' });
    } else {
      res.status(400).json({ error: 'Error creating user.' });
    }
  }
});



app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    
    if (password !== user.password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful!', success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'CodeEditor.js'));
});


app.post('/compile', async (req, res) => {
  const { code, lang, input } = req.body;

  const languageMap = {
    'Java': 'java',
    'Cpp': 'cpp',
    'Python': 'python3',
    'C': 'c',
  };

  const selectedLanguage = languageMap[lang];

  if (!selectedLanguage) {
    return res.status(400).json({ output: 'Unsupported language' });
  }

  const payload = {
    language: selectedLanguage,
    version: '*',
    files: [
      {
        name: `main.${selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'java' ? 'java' : selectedLanguage}`,
        content: code,
      },
    ],
    stdin: input || '',
  };

  console.log('Payload to Piston API:', JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', payload);

   
    console.log('Piston API Response:', response.data);

   
    if (response.data.run.code === 0) {
      
      const output = response.data.run.stdout || response.data.run.stderr;
      return res.json({ output });
    } else {
      
      console.error('Piston API Error:', response.data);
      return res.status(500).json({ output: response.data.run.stderr || 'Failed to run the code' });
    }
  } catch (error) {
    console.error('Piston API Error:', error.response ? error.response.data : error.message);
    return res.status(500).json({ output: 'Failed to compile and run the code. Please try again later.' });
  }
});


const flashcardSchema = new mongoose.Schema({
  username: String,
  title: String,
  body: String,
  created: { type: Date, default: Date.now },
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);


app.post('/flashcards', async (req, res) => {
  const { username, title, body } = req.body;

  try {
      const newFlashcard = new Flashcard({ username, title, body });
      
      await newFlashcard.save();
      res.status(201).json({ message: 'Flashcard saved successfully!', flashcard: newFlashcard });
  } catch (error) {
      res.status(400).json({ error: 'Error saving flashcard.' });
  }
});


app.get('/flashcards/:username', async (req, res) => {
  const { username } = req.params;

  try {
      const flashcards = await Flashcard.find({ username: username });
      res.status(200).json(flashcards);
      console.log(flashcards);
  } catch (error) {
      res.status(400).json({ error: 'Error fetching flashcards' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
