const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const member = require('./Members');
const moment = require('moment')

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`);
    next();
}

//Init middleware
app.use(logger);

//Gets all members
app.get('/api/members', (req, res) => {
    res.json(member)
})

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))