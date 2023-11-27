const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 3000;
// Sử dụng cors middleware mà không chỉ định origin
app.use(cors());

app.use(bodyParser.json());

// Define the path to the JSON file
const dataPath = 'db.json';

// Helper function to read data from the JSON file
const readData = () => {
    try {
        const data = fs.readFileSync(dataPath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Tạo thư mục nếu nó không tồn tại
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Helper function to write data to the JSON file
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};


// Routes
app.get('/', (req, res) => {
    const prods = readData();
    res.json(prods);
});


app.post('/image', upload.single('file'), (req, res) => {
    const prods = readData();
    const newProd = req.body;
    newProd.file = req.file ? req.file.originalname : null;
    prods.push(newProd);
    writeData(prods);
    res.json(newProd);
});


app.post('/', (req, res) => {
    const prods = readData();
    const newProd = req.body;
    prods.push(newProd);
    writeData(prods);
    res.json(newProd);
});

app.get('/:id', (req, res) => {
    const prods = readData();
    const prod = prods.find((t) => t.id === parseInt(req.params.id));
    res.json(prod);
});

app.put('/:id', (req, res) => {
    const prods = readData();
    const updatedProd = req.body;
    const index = prods.findIndex((t) => t.id === parseInt(req.params.id));
    prods[index] = { ...prods[index], ...updatedProd };
    writeData(prods);
    res.json(prods[index]);
});

app.delete('/:id', (req, res) => {
    const prods = readData();
    const index = prods.findIndex((t) => t.id === parseInt(req.params.id));
    prods.splice(index, 1);
    writeData(prods);
    res.json({ message: 'Prod deleted successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
