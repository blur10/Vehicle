const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, User, Cars } = require('./models');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Authentication Middleware
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

app.post('/api/submit-vehicle', authenticateUser, async (req, res) => {
  const { model, price, phone, maxPictures, pictures } = req.body;
  const userId = req.user.id; 

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new vehicle entry
    const car = await Cars.create({
      model,
      price,
      phone,
      maxPictures,
      imageUrls: [], 
      userId,
    });

    if (Array.isArray(pictures) && pictures.length > 0) {

      const uploadedImageUrls = await uploadPictures(pictures);
      car.imageUrls = uploadedImageUrls;
      await car.save();
    }

    res.json({ message: 'Vehicle submitted successfully', car });
  } catch (error) {
    console.error('Error during vehicle submission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
