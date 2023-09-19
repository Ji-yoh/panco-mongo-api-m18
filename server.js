const express = require('express');
const db = require('./config/connection');
const userRoutes = require('./routes/userRoutes')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(userRoutes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    })
})
