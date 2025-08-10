const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
/* If you added it: */ const generateRouter = require('./routes/generate');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (_req, res) => res.send('ok'));

// Routes
app.use('/', indexRouter);
/* If present */ app.use('/generate', generateRouter);

// 404
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'views', '404.html')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // <- update log text too
});
