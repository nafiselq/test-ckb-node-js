const db = require('../config/db');

class Karyawan {
    constructor(karyawan) {
        this.id = karyawan.id,
            this.title_job = karyawan.title_job,
            this.nik = karyawan.nik,
            this.name = karyawan.name,
            this.tempat = karyawan.tempat,
            this.tgl_lahir = karyawan.tgl_lahir,
            this.jenis_kelamin = karyawan.jenis_kelamin,
            this.alamat = karyawan.alamat,
            this.deleted_at = karyawan.deleted_at,
            this.created_at = karyawan.created_at
    }

    static getAll(callback) {
        db.query('SELECT * FROM `karyawan_its` WHERE deleted_at IS NULL', (error, results) => {
            if (error) {
                console.error('Error retrieving karyawan: ', error);
                return callback(error, null);
            }
            const karyawan = results.map((karyawan) => new Karyawan(karyawan));
            return callback(null, karyawan);
        });
    }

    static getById(karyawanId, callback) {
        db.query('SELECT * FROM `karyawan_its` WHERE karyawan_its.id = ?', karyawanId, (error, results) => {
            if (error) {
                console.error('Error retrieving karyawan: ', error);
                return callback(error, null);
            }
            if (results.length === 0) {
                return callback('karyawan not found', null);
            }
            const karyawan = new Karyawan(results[0]);
            return callback(null, karyawan);
        });
    }

    save(callback) {
        db.query('INSERT INTO karyawan_its SET ?', this, (error, result) => {
            if (error) {
                console.error('Error creating karyawan: ', error);
                return callback(error, null);
            }
            this.id = result.insertId;
            return callback(null, this);
        });
    }

    update(callback) {
        let query = 'UPDATE karyawan_its SET ';
        const values = [];

        if (this.job_id) {
            query += 'job_id = ?, ';
            values.push(this.job_id);
        }

        if (this.nik) {
            query += 'nik = ?, ';
            values.push(this.nik);
        }

        if (this.name) {
            query += 'name = ?, ';
            values.push(this.name);
        }

        if (this.alamat) {
            query += 'alamat =?, ';
            values.push(this.alamat);
        }

        // Menghapus koma terakhir
        query = query.slice(0, -2);

        query += ' WHERE id = ?';
        values.push(this.id);

        db.query(query, values, (error) => {
            if (error) {
                console.error('Error updating karyawan: ', error);
                return callback(error);
            }
            return callback(null);
        });

        // db.query('UPDATE karyawan_its SET job_id = ?, nik = ?, name = ?, alamat = ? WHERE id = ?', [this.job_id, this.nik, this.name, this.alamat], (error) => {
        //     if (error) {
        //         console.error('Error updating karyawan: ', error);
        //         return callback(error);
        //     }
        //     return callback(null);
        // });
    }

    delete(callback) {
        db.query('UPDATE karyawan_its SET deleted_at = ? WHERE id = ?', [this.deleted_at, this.id], (error) => {
            if (error) {
                console.error('Error deleting user: ', error);
                return callback(error);
            }
            return callback(null);
        });
    }
}

module.exports = Karyawan;