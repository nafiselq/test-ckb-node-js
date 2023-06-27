const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');
const karyawanController = require('./controller/karyawan.controller');

const app = express();
app.use(bodyParser.json());

//Database connection
db.connect();

// Routes
app.get('/karyawans', karyawanController.getAllKaryawan);
app.get('/karyawans/:id', karyawanController.getKaryawanById);
app.post('/karyawans', karyawanController.createKaryawan);
app.put('/karyawans/:id', karyawanController.updateKaryawan);
app.put('/karyawans/delete/:id', karyawanController.deleteKaryawan);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
