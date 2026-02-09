const express = require('express');
const app = express();

const authRoutes  = require('./routes/auth')
const todoRoutes  = require('./routes/todos')
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'))


// Removed - index.html will be served by express.static instead

app.use('/auth',authRoutes)
app.use('/todos',todoRoutes)

app.listen(PORT, ()=>
{
    console.log(`Server running on http://localhost:${PORT}`);
});