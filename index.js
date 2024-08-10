const express = require('express');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/userRoutes');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());


mongoose.connect('mongodb+srv://test:test@cluster0.vkjnqsh.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });
  


app.use('/api', userRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});


//To run this Install -->
//npm install body-parser method-override express-validator mongoose express path