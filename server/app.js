const express = require('express');
const mongoose = require('mongoose');
const salaryRoutes = require('./routes/salaryRoutes');
const labourRoutes = require('./routes/labourRoutes');
const app = express();
const cors = require('cors');

app.use(cors());


mongoose.connect('mongodb://localhost:27017/salaryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use('/api/salary', salaryRoutes);
app.use('/api/labours', labourRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
