const express = require('express');
const cors = require('cors'); // Import CORS
const fileUpload = require('express-fileupload');

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Other middleware
app.use(express.json());
app.use(fileUpload());

// Your routes
app.post('/enhance-image', (req, res) => {
    // Your code to handle the image enhancement
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
