import express from 'express';
import dotenv from 'dotenv';
import { escape } from 'querystring';

dotenv.config();

const app = express ();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('A API ta no ar');
});

app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`);
});
