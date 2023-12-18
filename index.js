const express = require('express');
const app = express();
const conn = require('./config/db');

app.use(express.json())
app.listen(3000);

app.get('/getall', function(req,res) {
    const sqlQuery = "SELECT * FROM mahasiswa";
    conn.query (sqlQuery, (err, results) => {
        if(err) {
            console.log(err);
            res.error(err.sqlMessage, res);
        }else {
            res.status(200).json({
                message: "Seluruh data mahasiswa",
                "data": results
            });
        }
    });
})

/*app.get('/mahasiswa', function(req, res){
    const param = req.query;
    const id = param.id;
    const sqlQuery = "SELECT * FROM mahasiswa WHERE id = ?";
    const values = [id];
    conn.query(sqlQuery, values, (err,results) => {
        if (err) {
            res.error(err.sqlMessage, res);
        }else{
            res.json({
              message: "Menampilkan data ",
              data: results
            });
        }
    })
}) */

app.get('/mahasiswa', function(req, res){
    const param = req.query;
    const id = param.id;
    const nama = param.nama;
    const npm = param.npm;

    let sqlQuery;
    let values;

    switch(true){
        case Boolean(id):
            sqlQuery = "SELECT * FROM mahasiswa where id = ?";
            values = [id];
            break;
        case Boolean(nama):
            sqlQuery = "SELECT * FROM mahasiswa where nama = ?";
            values = [nama];
            break;
        case Boolean(npm):
            sqlQuery = "SELECT * FROM mahasiswa where npm = ?";
            values = [npm];
            break;
        
        default:
            return res.status(400).json({
                message: "Silahkan input nama atau id"
            });

    }
    conn.query(sqlQuery, values, (err, results) => {
        if(err){
            res.error(err.sqlMessage, res);
        } else {
            res.json({
                message: "Menampilkan data yang di cari",
                data: results
            });
        } 

    });

})

app.post('/mahasiswa', function(req, res){
    const body = req.body;
    const npm = body.npm;
    const nama = body.nama;
    const jurusan = body.jurusan;
    const sqlQuery = 'INSERT INTO mahasiswa(npm, nama, jurusan) VALUES (?,?,?)';
    const values = [npm, nama, jurusan];

    conn.query(sqlQuery, values, (err, results) => {
        if (err){
            console.log(err);
        } else {
            res.json({
                message: "Berhasil membuat data mahasiswa baru",
                data: body
            });
        }
    });

})

app.delete('/mahasiswa', function(req, res){
    const body = req.body;
    const npm = body.npm;

    const sqlQuery = 'DELETE FROM mahasiswa WHERE npm = ?';
    const values = [npm];

    conn.query(sqlQuery, values, (err, results) => {
        if (err){
            console.log(err);
        } else {
            res.json({
                message: "Data mahasiswa berhasil di hapus",
            })
        }
    })
})