// Karyawan.controller.js

const Karyawan = require('../model/karyawan.model');

// Mendapatkan semua Karyawan
exports.getAllKaryawan = (req, res) => {
  Karyawan.getAll((error, karyawan) => {
    if (error) {
      return res.status(500).json({ error });
    }
    return res.send({status: 200, message: 'Berhasil dapet all karyawan', data: karyawan});
  });
};

// Mendapatkan karyawan berdasarkan ID
exports.getKaryawanById = (req, res) => {
  const { id } = req.params;
  Karyawan.getById(id, (error, karyawan) => {
    if (error === 'Karyawan not found') {
      return res.status(404).json({ error });
    }
    if (error) {
      return res.status(500).json({ error });
    }
    return res.json(karyawan);
  });
};

// Membuat karyawan baru
exports.createKaryawan = (req, res) => {
  const newKaryawan = new Karyawan(req.body);
  newKaryawan.save((error, karyawan) => {
    if (error) {
      return res.status(500).json({ error });
    }
    return res.status(201).json(karyawan);
  });
};

// Mengupdate karyawan berdasarkan ID
exports.updateKaryawan = (req, res) => {
  const { id } = req.params;
  const updatedKaryawan = new Karyawan(req.body);
  updatedKaryawan.id = id;
  updatedKaryawan.update((error) => {
    if (error) {
      return res.status(500).json({ error });
    }
    return res.send({ status: 200, message: "Successfully update karyawan"});
  });
};

// Menghapus Karyawan berdasarkan ID
exports.deleteKaryawan = (req, res) => {
  const { id } = req.params;
  const deletedKaryawan = new Karyawan(req.body);
  deletedKaryawan.id = id;
  deletedKaryawan.delete((error) => {
    if (error) {
      return res.status(500).json({ error });
    }
    return res.send({ status: 200, message: "Successfully delete karyawan"});
  });
};
