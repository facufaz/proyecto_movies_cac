const db = require('../db/db');

const getAllData = (req, res) => {
    const sql = 'SELECT * FROM data JOIN movies ON data.movie_id = movies.id';

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const getDataById = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM data WHERE movie_id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const createData = (req, res) => {
    const { movie_id, title, views, description } = req.body;
    const sql = 'INSERT INTO data (movie_id, title, views, description) VALUES (?, ?, ?,?)';

    db.query(sql, [movie_id, title, views, description], (err, results) => {
        if (err) throw err;
        res.status(201).json({ message: 'Data Created', dataId: results.insertId });
    });
};

const updateData = (req, res) => {
    const sql = 'UPDATE data SET ? WHERE movie_id = ?';
    const id = req.params.id;
    const updatedData = req.body;

    db.query(sql, [updatedData, id], (err, results) => {
        if (err) throw err;
        res.json({ id, ...updatedData });
    });
};

const deleteData = (req, res) => {
    const sql = 'DELETE FROM data WHERE movie_id = ?';
    const id = req.params.id;

    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Data deleted successfully' });
    });
};

module.exports = {
    getAllData,
    getDataById,
    createData,
    updateData,
    deleteData,
};
