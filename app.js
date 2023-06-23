const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running and listening to ${PORT}`);
})

app.get('/', (req, res)=>{
    res.send('Salam');
})