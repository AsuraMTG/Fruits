const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello WRLD!');
});

app.get('/fruits', async (req, res) => {
    try {
        let fruits = await db.query(
            `SELECT * FROM fruits`
        );
        res.status(200).json(fruits);
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt a gyümölcsök listázása közben', error });
    }
});

app.get('/fruits/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let fruits = await db.query(
            `SELECT * FROM fruits WHERE id = ?`,[id]
        );
        res.status(200).json(fruits);
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt a gyümölcsök listázása közben', error });
    }
});

app.post('/fruits', async (req, res) => {
    const { name, quantity, price } = req.body;
    try {
        let fruits = await db.query(
            `INSERT INTO fruits (name, quantity, price) VALUES (?, ?, ?)`, [name, quantity, price]

        );
        res.status(200).json(fruits);
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt a gyümölcsök listázása közben', error });
    }
});

//PUT /fruits/:id
app.put('/fruits/:id', async (req, res) => {
    const id = req.params.id;
    const { name, quantity, price } = req.body;
    try {
        let fruits = await db.query(
            `UPDATE fruits SET name = ?, quantity = ?, price = ? WHERE id = ?`, [name, quantity, price, id]
        );
        res.status(200).json(fruits);
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt a gyümölcsök listázása közben', error });
    }
});

app.delete('/fruits/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await db.query(
            `DELETE FROM fruits WHERE id = ?`, [id]
        );
        res.status(200).json({ message: 'gyümölcs törölve' });
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt a gyümölcsök törlése közben', error });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Valami hiba történt az alkalmazásban!' });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});