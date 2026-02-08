const express = require('express');
const app = express();

const authRoutes  = require('./routes/auth')
const todoRoutes  = require('./routes/todos')
const PORT = 3000;

app.use(express.json());

app.get('/', (req , res)=>
{
    res.send('Todo Auth API is running!');
});

app.use('/auth',authRoutes)
app.use('/todos',todoRoutes)

app.listen(PORT, ()=>
{
    console.log(`Server running on http://localhost:${PORT}`);
});