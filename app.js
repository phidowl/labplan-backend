const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const generateRouter = require('./routes/generate'); // if you added it

const app = express();
// 👇 use the port Railway assigns
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// quick health check so Railway knows we're alive
app.get('/health', (req, res) => res.send('ok'));

app.use('/', indexRouter);
app.use('/generate', generateRouter); // if present

app.use((req, res) =>
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
