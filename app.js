const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const generateRouter = require('./routes/generate'); // <-- make sure routes/generate.js exists

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Health check for Railway
app.get('/health', (_req, res) => res.send('ok'));

// Routes
app.use('/', indexRouter);
app.use('/generate', generateRouter);

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
